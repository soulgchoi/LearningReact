import React, {Component} from 'react';
// 클래스형 컴포넌트
import MyComponent from './components/MyComponent';
// MyComponent 컴포넌트를 불러왔다.

// 클래스형 컴포넌트와 함수형 컴포넌트의 역할은 같다.
/*
    클래스형 컴포넌트의 특징
    1. state 와 라이프사이클 사용 가능
    2. 임의의 메서드 정의 가능
    3. render 함수가 반드시 필요하다.

    함수형 컴포넌트의 장점
    1. 선언하기 편하다.
    2. 메모리를 덜 사용한다.
    3. Hooks 업데이트로 state 와 라이프사이클도 사용가능하다. (클래스형과 방식은 다르다.)
    4. React 는 함수형 컴포넌트 + Hooks 를 권장한다.
*/
class App extends Component {
    render() {  // 함수형 컴포넌트에서 필수!
        const name = 'react';
        // return <div className="react">{name}</div>;
        return <MyComponent/>
    }
}
export default App;