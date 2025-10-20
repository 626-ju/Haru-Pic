import { App } from './App.js';

export const SeongJoo = {
  createElement,
  render,
  currentFiber: null,
};

window.SeongJoo = SeongJoo;

//ReactElement처럼 만들기
function createElement(type, props, ...children) {
  const flatChildren = children
    .flat(Infinity)
    .map((child) =>
      typeof child === 'object' && child !== null
        ? child
        : createTextElement(child),
    );

  return {
    type,
    props: {
      ...props,
      children: flatChildren,
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

//ReactElement에 diffing을 위한 정보 추가
function createFiber(element, container) {
  return {
    type: element.type,
    props: element.props,
    hooks: [],
    dom: null,
    parent: null,
    parentDom: container,
    child: null,
    sibling: null, //다음 형제를 가리킴
  };
}

function setProps(dom, props) {
  //실제 dom에 props 적용시키는 함수
  const isProperty = (key) => key !== 'children';
  const isEvent = (key) => key.startsWith('on');

  Object.keys(props || {})
    .filter(isProperty)
    .forEach((name) => {
      if (isEvent(name)) {
        // 이벤트 핸들러 처리
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]); //추후 언 마운트 시 리스너 제거?
      } else if (name === 'style') {
        Object.assign(dom.style, props[name]);
      } else if (name === 'className') {
        dom.className = props[name];
      } else if (name in dom) {
        // DOM 프로퍼티로 설정+텍스트의 nodeValue도 포함
        try{ 
          dom[name] = props[name];
        }catch{ //read-only라서 직접 할당이 불가능한 경우 ex) form속성
          dom.setAttribute(name, props[name]);
        }
      } else {
        // HTML 속성으로 설정
        dom.setAttribute(name, props[name]);
      }
    });
}

//실제 dom노드 생성
function createDom(element) {
  const dom =
    element.type == 'TEXT'
      ? document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type);

  if (element.type !== 'TEXT') {
    setProps(dom, element.props);
  }

  return dom;
}

function render(element, container) {
  const fiber = createFiber(element, container);

  // 함수형 컴포넌트 처리
  if (typeof fiber.type === 'function') {
    SeongJoo.currentFiber = fiber; //해당 컴포넌트를 그릴 때 어디서 실행된 거인지 저장용
    fiber.hookIndex = 0; //구분용

    const componentElement = fiber.type(fiber.props);

    //함수형 컴포넌트는 dom이 없으니까 자식의 dom사용
    const childFiber = render(componentElement, container);
    fiber.dom = childFiber.dom;
    fiber.child = childFiber;
    childFiber.parent = fiber;

    return fiber;
  }

  // DOM 노드 생성
  const dom = createDom(element);
  fiber.dom = dom; //fiber에 dom추가

  // 자식 요소들 재귀적으로 렌더+ fiber에 관계 추가
  let prevChild = null; //형제 넘겨주기 위한 임시 저장용
  (element.props?.children || []).forEach((child, i) => {
    const childFiber = render(child, dom); //render가 fiber를 반환하니까

    childFiber.parent = fiber; //parent가 부모 가리키게

    if (i === 0) {
      fiber.child = childFiber;
    } //첫 자식일 경우
    else {
      prevChild.sibling = childFiber; //형제 연결
    }
    prevChild = childFiber;
  });

  container.appendChild(dom);

  return fiber; //렌더지만 반환은 fiber
}

export function rerender(fiber) {
  fiber.hookIndex = 0;
  SeongJoo.currentFiber = fiber;

  //함수형일 경우
  const newElement = fiber.type(fiber.props);

  reconcile(fiber.child, newElement);
}

export function reconcile(fiber, newElement) {
  //elment의 타입이 같다면 프롭만 업데이트
  if (fiber.type === newElement.type) {
    //함수형이면 실행하기
    if (typeof fiber.type === 'function') {
      fiber.hookIndex = 0; //hook도 다시 실행해야 하니 0부터
      SeongJoo.currentFiber = fiber;

      const newChildElement = fiber.type(newElement.props);
      fiber.props = newElement.props; // props 업데이트

      reconcile(fiber.child, newChildElement);
      return;
    }

    updateProps(fiber.dom, fiber.props, newElement.props);
    fiber.props = newElement.props;

    //자식들도 비교
    const newChildren = newElement.props.children || [];
    let childFiber = fiber.child;

    newChildren.forEach((newChild) => {
      if (childFiber) {
        //자식이 있으면 자식도 비교하기
        reconcile(childFiber, newChild);
        childFiber = childFiber.sibling; //다음 형제로
      } else {
        render(newChild, fiber.dom);
      }
    });

    // 위에 forEach 다 돌았는데 형제가 남아 있다면(남은 기존 자식 제거)
    while (childFiber) {
      childFiber.dom.remove();
      childFiber = childFiber.sibling;
    }
  } else {
    //다르면 아예 새로 만들어서 교체

    //새로운 비교대상이 함수형이면
    if (typeof newElement.type === 'function') {
      const newFiber = render(newElement, fiber.parent?.dom || document.body);
      fiber.dom.replaceWith(newFiber.dom);

      fiber.dom = newFiber.dom;
      fiber.type = newElement.type;
      fiber.props = newElement.props;
      fiber.child = newFiber.child;
      return;
    } else {
      //함수형이 아닐 때
      const newDom = createDom(newElement);

      fiber.dom.replaceWith(newDom); //실제 브라우저 dom교체(dom api)
      fiber.dom = newDom; //fiber객체의 참조 변경
      fiber.type = newElement.type;
      fiber.props = newElement.props;
    }
  }
}

function updateProps(dom, prevProps, newProps) {
  const isEvent = (key) => key.startsWith('on');
  const isProperty = (key) => key !== 'children';

  //사라진 이벤트 리스너 제거
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach((name) => {
      if (!(name in newProps) || prevProps[name] !== newProps[name]) {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      }
    });

  //사라진 프롭 제거
  Object.keys(prevProps)
    .filter(isProperty)
    .filter((key) => !(key in newProps))
    .forEach((name) => {
      if (name === 'className') {
        dom.className = '';
      } else if (name === 'style') {
        Object.keys(prevProps.style || {}).forEach((key) => {
          dom.style.removeProperty(key);
        });
      } else if (name in dom) {
        dom[name] = '';
      } else {
        dom.removeAttribute(name);
      }
    });

  //값이 변경된 프롭 찾기
  const changedProps = {};
  Object.keys(newProps)
    .filter(isProperty)
    .forEach((key) => {
      if (prevProps[key] !== newProps[key]) {
        changedProps[key] = newProps[key];
      }
    });

  //바뀐 값 반영
  setProps(dom, changedProps);
}

const rootElement = <App />;
const rootContainer = document.getElementById('root');

SeongJoo.render(rootElement, rootContainer);
