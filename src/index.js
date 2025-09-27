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
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child),
      ),
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
      ? document.createTextNode('')
      : document.createElement(element.type);

  // props 추가
  const isProperty = (key) => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      if (name === 'style') {
        Object.assign(dom.style, element.props[name]);
      } else if (name === 'className') {
        dom.className = element.props[name];
      } else {
        dom[name] = element.props[name];
      }
    });

  // 자식 요소들 재귀적으로 렌더링
  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

SeongJoo.render(<App />, document.getElementById('root'));

console.log(document.querySelector('#root div').className);
