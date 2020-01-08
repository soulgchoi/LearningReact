import React from 'react';
// 2.1 node_modules 에 있는 react 를 가져온다.
// 번들러는 이렇게 불러온 모듈을 하나의 파일로 묶는다.
import './App.css';

// 함수형 컴포넌트
// JSX 형태 
function App() {
  const name = '리액트';
  const name2 = undefined;
  // 4.6. 스타일을 적용할 때는 객체 형태로 넣는다. JS 이므로 카멜표기법으로 작성한다.
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: '24px',
    fontWeight: 'bold',
    padding: 16  // 단위 생략하면 px
  };
  return (
    // 4.1. 리액트 컴포넌트는 반드시 하나의 요소로 감싸서 하나의 DOM 트리 구조로 만들어야 한다.
    <div>
      {/* 2.2. JSX 형태 코드는 번들링되면서 바벨이 일반 자바스크립트 형태로 변환한다. */}
      {/* React.createElement("div", null, "Hello", React.createElement("b", null, "react")); 와 같다. */}
      <div>
      Hello <b>react</b>
      </div>
      {/* 4.2. JSX 안에서 표현식을 쓸 수 있다. */}
      <h1>{name} 안녕!</h1>
      <h2>잘 작동하니?</h2>
      {/* 4.3. JSX 밖에서 사전에 값을 설정하거나, {} 안에서 조건연산자(삼항연산자)를 사용할 수 있다. */}
      {name === '리액트' ? (
        <p>리액트입니다.</p>
      ) : (
        <p>리액트가 아닙니다.</p>
      )}
      {/* 4.4. && 연산도 가능하다. false 일 때는 null 처럼 아무것도 렌더링하지 않는다. */}
      {/* false 한 값인 0 은 예외적으로 렌더링된다. */}
      {name === '리액트' && <p>리액트입니다.</p>}
      {/* 4.5. 함수 내에서 undefined 만 반환해서는 안되지만, JSX 내부에서 undefined 렌더링도 가능하다. */}
      {name2}
      {name2 || '리액트'}
      {/* 4.6. 스타일링 */}
      <div style={style}>{name}</div>
      {/* 또는 바로 스타일을 지정한다. */}
      <div style={{
        backgroundColor: 'grey',
        color: 'aqua',
        fontSize: '24px',
        fontWeight: 'bold',
        padding: 16
      }}>
        {name}
      </div>
      {/* 4.7. App.css 에서 설정한 클래스, 리액트에서는 class 가 아닌 className 으로 쓴다. */}
      <div className="react">{name}</div>
    </div>
  );
}

export default App;
