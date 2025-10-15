import { useState } from '../../hooks/useState.js';

let isInit = false;
let globalCleanups = [];

export function addCleanup(cleanupFn) {
  globalCleanups.push(cleanupFn);
}

function runAllCleanups() {
  globalCleanups.forEach((fn) => fn());
  globalCleanups = [];
}

const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  //한번만 등록되도록
  if (!isInit) {
    window.addEventListener('popstate', () => {
      runAllCleanups();
      setCurrentPath(window.location.pathname);
    });
    isInit = true;
  }

  //동적라우팅 추가
  const matchedRoute = (routePath, currentPath) => {
    // /albums/:albumid
    const pattern = routePath.replace(/:\w+/g, '([^/]+)');
    const routeRegex = new RegExp('^' + pattern + '$');

    // /albums/123  (실제 id)
    const matched = currentPath.match(routeRegex); //['/albums/123','123']

    if (!matched) {
      return null;
    }

    //paramNames= ['albumId']
    const paramNames = [...routePath.matchAll(/:(\w+)/g)].map(
      (matched) => matched[1],
    );

    const params = {};

    paramNames.forEach((name, i) => {
      params[name] = matched[i + 1];
    });

    return params;
  };

  let params = {};

  const foundRoute = children.find((child) => {
    const matchedParams = matchedRoute(child.props.path, currentPath);

    if (matchedParams !== null) {
      params = matchedParams;
      return true;
    }

    return false;
  });

  return foundRoute ? <Route {...foundRoute.props} params={params} /> : null;
};

const Route = ({ component: Component, params }) => {
  return <Component params={params} />;
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
