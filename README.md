#  하루픽 - 사진 일기 앱


<img width="1120" height="800" alt="og-image2" src="https://github.com/user-attachments/assets/824560c1-32f3-4bf0-8388-54fe673f72ad" />


>간단한 사진과 메모를 남길 수 있는 사진 일기 앱<br/>
>바닐라 JavaScript로 React를 구현하며 리액트의 동작원리 학습

<a href='https://haru-pic.vercel.app/'>배포링크</a>

<br/>

# 1. 개발 환경
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black)


<br/>

# 2. 핵심 로직

<details>
<summary>  <h3>createElement()</h3> </summary>

>createElement함수를 바벨에 pragma에 등록,<br/>
>jsx형태를 React Element와 유사한 객체로 변환 
 
 ```js
//jsx 예시
<div className="container">Hello</div>


//Babel이 트랜스파일링 할 때 pragma에 등록된 createElement함수를 통해 객체로 변환
{
	type: 'div',
	props: {
		className: 'container',
		children: [
			{ type: 'TEXT', props: { nodeValue: 'Hello' } }
		]
	}
}
 ```

</details>

<!--render------------------------------------------------------------------------------------------------>
<details>
<summary><h3>render()</h3></summary>

>js가 클라이언트 단에 도착하면
>바벨이 변환한 객체를  실제 DOM 요소로 만들어서 html에 추가

```js
function render(element, container) {
  //돔 요소로 생성
  const dom = createDom(element);
  fiber.dom = dom;
  
  //자식을 재귀적으로 돌면서 렌더링
  element.props?.children.forEach((child, i) => {
    const childFiber = render(child, dom);
	   //(...생략)
  });
  
  //실제 DOM에 추가
  container.appendChild(dom);
   //(...생략)
}
```

</details>

<!--useState------------------------------------------------------------------------------------------------>
<details>
<summary><h3>useState()</h3></summary>

>컴포넌트의 상태관리 시도<br/>
>단순 값 저장이 아닌 상태가 변경되었을 때 변경된 곳에서 리렌더를 유발시켜야 함<br/>
>reconcilation하는 과정의 필요성을 느낌<br/>

```js
 function setState(value) {
	 //함수형으로 받으면 이전 상태를 인자로 
    hooks[index].state =
      typeof value === 'function' ? value(hooks[index].state) : value;

    //✨리렌더를 트리거 해야 함
    rerender(fiber); 
  }
```

</details>

<!--reconcile------------------------------------------------------------------------------------------------>
<details>
<summary><h3>reconcile()<h3></summary>

>reconcilation과정을 구현하려면 기존 렌더링의 결과들을 담아 `Diffing`하는 과정이 필요<br/>
>기존 렌더링 점보를 담아두기 위해 리액트의 fiber 트리와 비슷한 구조 채택

<h4>1) fiber예시</h4>

```js
{
  type: 'div',           // 요소 타입
  props: { ... },        // 속성
  dom: HTMLElement,      // 실제 DOM 참조
  
  parent: Fiber,         // 부모
  child: Fiber,          // 첫 번째 자식
  sibling: Fiber,        // 다음 형제
  
  hooks: [],             // useState 등 Hook 저장
  hookIndex: 0           // 현재 Hook 인덱스
}

```

<h4>2) Diffing</h4>

> reconcile 함수 자체는 크게 2가지 경우로 나뉨<br/>
> 1)fiber의 type이 같을 경우 -> 바뀐 부분만 교체 <br/>
> 2)fiber의 type이 다를 경우 -> 기존 요소 삭제 후 전체를 새로 추가

  ```js
  function reconcile(){
   if (oldFiber.type === newElement.type) {
  	 //타입이 같으면 프롭 업데이트 후 기존 요소 재사용
  	  updateProps(fiber.dom, fiber.props, newElement.props);
      fiber.props = newElement.props;
      
      //그 후 자식들도 재귀적으로 돌면서 똑같이 비교
      //(...생략)
   }else{
     //타입이 다르면 아예 새로 만들어서 교체
      const newDom = createDom(newElement);
  
       fiber.dom.replaceWith(newDom); //실제 브라우저 dom교체(dom api)
       fiber.dom = newDom; //fiber객체의 참조 변경
       fiber.type = newElement.type;
       fiber.props = newElement.props;
    }
  }
  ```

 

</details>


<!--router------------------------------------------------------------------------------------------------>
<details>
<summary><h3>router</h3></summary>
  
> SPA에서 페이지 새로고침 없는 라우팅을 구현하기 위해<br/>
> `URL 변경 감지`와 `동적 라우팅` 의 필요성을 느낌

 <h4>1) pushState 메서드 popstate 이벤트로 브라우저 히스토리 관리</h4>
 
```js
const router = {
  push: (path) => {
    //렌더링 끝나고 다음 이벤트 루프에 실행하도록
    setTimeout(() => {
      //히스토리 스택에 추가 + url변경
      window.history.pushState({}, '', path);
      //이벤트 강제 트리거
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 0);
  },
  
  //(...생략)
};
```

<br/>

<h4>2) 정규표현식으로 동적 경로 매칭</h4>

```js
const matchedRoute = (routePath, currentPath) => {
    // /albums/:albumid -> 정규표현식으로 변환
    const pattern = routePath.replace(/:\w+/g, '([^/]+)');
    const routeRegex = new RegExp('^' + pattern + '$');

    // /albums/123  (실제 id)
    const matched = currentPath.match(routeRegex); //['/albums/123','123']
	  //파라미터 이름과 값을 추출 객체로 변환 후 (ex) { albumId: '123' })
	  //해당 컴포넌트에 props로 전달

		//(...생략)
  };
  
  //(...생략)
};
```
<br/>

  <h4> 3) 라우트 이동 시 불필요한 이벤트 리스너 해제</h4>
  
```js
//globalCleanups에 등록된 removeEvnetListener 전부 실행 후 초기화 하는 함수
//-> popstate이벤트 핸들러에서 일괄 호출
function runAllCleanups() {
  globalCleanups.forEach((fn) => fn());
  globalCleanups = [];
}
```

</details>
