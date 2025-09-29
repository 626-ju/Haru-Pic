import { App } from './App.js';

export const SeongJoo = {
  createElement,
  render,
};

window.SeongJoo = SeongJoo;
// import { _SeongJoo } from './index.js';
// 원래 위와 같이 직접 사용하지 않더라도 바벨이 트랜스파일링 하려면 임포트가 필요(리액트 17버전 이전엔 react를 임포트했던 것처럼)
// window의 속성으로 추가함으로써 임포트 없이 사용하고자 함

function createElement(type, props, ...children) {
  /* ex) children이 배열로 한번 감싸져서 옴 */
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

function render(element, container) {
  // 함수형 컴포넌트 처리
  if (typeof element.type === 'function') {
    const componentElement = element.type(element.props);
    return render(componentElement, container);
  }

  // DOM 노드 생성
  const dom =
    element.type == 'TEXT'
      ? document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type);

  if (element.type !== 'TEXT') {
    // props 추가
    const isProperty = (key) => key !== 'children';
    const isEvent = (key) => key.startsWith('on');

    Object.keys(element.props || {})
      .filter(isProperty)
      .forEach((name) => {
        if (isEvent(name)) {
          // 이벤트 핸들러 처리
          const eventType = name.toLowerCase().substring(2);
          dom.addEventListener(eventType, element.props[name]);
        } else if (name === 'style') {
          Object.assign(dom.style, element.props[name]);
        } else if (name === 'className') {
          dom.className = element.props[name];
        } else if (name in dom) {
          // DOM 프로퍼티로 설정
          dom[name] = element.props[name];
        } else {
          // HTML 속성으로 설정
          dom.setAttribute(name, element.props[name]);
        }
      });

    // 자식 요소들 재귀적으로 렌더링
    (element.props?.children || []).forEach((child) => render(child, dom));
  }

  container.appendChild(dom);
}

SeongJoo.render(<App />, document.getElementById('root'));
