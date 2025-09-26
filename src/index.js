/*
  createElement - > 리액트 요소를 실제 돔요소로 만드는 함수
*/

const SeongJoo = {
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

//바벨이 SeongJoo.createElement로 트랜스파일링
const element = <h1 title="foo">SeongJoo's JS to React</h1>;

SeongJoo.render(element, document.getElementById('root'));
