import { App } from './App.js';

export const SeongJoo = {
  createElement,
  render,
};

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
      dom[name] = element.props[name];
    });

  // 자식 요소들 재귀적으로 렌더링
  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

SeongJoo.render(<App />, document.getElementById('root'));
