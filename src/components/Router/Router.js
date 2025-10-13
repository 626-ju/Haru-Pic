import { useState } from '../../hooks/useState.js';

let isInit = false;

const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  //한번만 등록되도록
  if (!isInit) {
    window.addEventListener('popstate', () => {
      setCurrentPath(window.location.pathname);
    });
    isInit = true;
  }

  const matchedRoute = children.find(
    (child) => child.props.path === currentPath,
  );

  return matchedRoute || null;
};

const Route = ({ component: Component }) => {
  return <Component />;
};

const router = {
  push: (path) => {
    //히스토리 스택에 추가 + url변경
    window.history.pushState({}, '', path);
    //이벤트 강제 트리거
    window.dispatchEvent(new PopStateEvent('popstate'));
  },
};

export { Router, Route, router };
