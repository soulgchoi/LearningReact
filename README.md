# 개발 중 이슈들

## 🤔 하고 싶었던 것

### 🌴 className 에 여러 개를 넣고 싶다!

`<tag className={"string으로 된 className" + (this.state 또는 props 로 불러오는 부분)}>`

### 🌴 inline 으로 style 을 쓰고 싶다!

`<tag style={{스타일: 값}}>`

### 🌴 `<Link>` 에 `props` 를 전달하고 싶다!

`react-router-dom` 을 설치하고 `Link` 와 `Route`, `RouteComponentProps` 를 사용

- `Route` 는 이렇게

    ```typescript
    import { Route } from "react-router-dom";
    import MyComponent from "components/MyComponent";
    <Route
    	 exact path="/my/url/:propsname"
    	 component={MyComponent}
    />
    ```

- `props` 전달할 상위 컴포넌트

    ```typescript
    import { Link } from 'react-router-dom'
    ...
    render() {
    	return (
    		<div>
    			<Link to={`my/url/${propsname}`}></Link>
    		</div>
    ```
    
- `props` 받는 하위 컴포넌트

    ```typescript
    import { RouteComponentProps } from 'react-router-dom'
    
    const MyComponent = (props: RouteComponentProps<{ propsname: type }>) => {
    	return (
    		<div>
    			{props.match.params.propsname}
    		</div>
    ```

아직 클래스형으로 구현하는 방법은 익히지 못했으므로 우선 함수형으로 작성한다.

상세페이지 등 `id` 를 전달받을 때 사용하면 더 깔끔한 URL 이 나올 것 같다.

## 🤮 에러

### 🌵 `state` 에 있는 배열이 갱신되지 않는다!

TypeError: cannot read property “temp” of undefined

`react-infinite-scroll-component` 를 사용할 때,

`state` 에 `myArray`라는 배열을 선언하고, `interface` 에도 분명히 `Array<any>` 타입을 줬는데, `this.setState({ myArray: 들어갈 배열})` 을 해도 동작하지 않았다.

**최초는 들어가지만, 갱신이 안됨**

→ `this.setState({ myArray: this.state.myArray.concat(들어갈 배열)})` 로 추가한다. ( 파이썬에서 `myArray.add(들어갈 배열)` 느낌)

### 🌵 All files must be modules when the '--isolatedModules' flag is provided

거의 빈 파일이 있을 때 발생했다.

파일을 삭제하거나 `import React from 'react'` 정도만 추가해도 잘 작동한다.

### 🌵 Objects are not valid as a React child (found: object with keys {}). ~~

말 그대로 `Object` 를 주면 안될 때.. 주로 네이밍 문제로 발생했다. 같은 이름의 변수를 함부로 쓰지 말자!