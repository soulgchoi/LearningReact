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

### 🌴 `File` 타입을 initial value 로 선언하고 싶다!

```typescript
fileType: new File([""], "", {type: ""})
```

- 참고 링크

### 🌴  FormData 를 console 에 출력하고 싶다!

`formdata = new FormData();`  로 새 formdata 를 만들었으면,

`formdata.append("key": "value")` 또는 `formdata.set("key": "value")` 로 넣게 된다.

`formdata.get("key")`  key 값으로 value 를 확인할 수 있다.

### 🌴 게시글을 작성할 때 이미지와 텍스트를 한 번에 submit 하고 싶다!

이미지 업로드, 게시글 작성 다 따로따로 나오는데, 한번에 올리는 방법을 당최 모르겠어서 찾아보았다. 그냥 content 만 할 때는 `FormData` 를 쓰지 않아도 되었기 때문.

텍스트를 이미지와 다른 key 를 가진 `FormData` 로 넘기면 된다.

```typescript
const fd = new FormData();
fd.append("image", this.state.selectedFile);
fd.set("data", this.state.content)
```

### 🌴 JSX로 `<Label>` 안에 `for` 를 넣고 싶다!

`for` 대신 `htmlFor` 를 쓰면 된다^^.

### 🌴 뒤로가기 버튼을 만들고 싶다!

`react-router-dom` 에서 `withRouter` 를 사용하면 된다.

```typescript
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface IProps extends RouteComponentProps {
    text: string;
}

class GoBackButton extends React.Component<IProps, {}> {
    render() {
        return <button onClick={this.props.history.goBack}>
                {this.props.text}
	             </button>
        );
    }};
export default withRouter(GoBackButton);
```

컴포넌트는 `withRouter` 로 감싸주고, props 가 있는 경우 `RouteComponentProps` 타입으로 선언해야 타입에러가 뜨지 않는다.

`goBack()` 은 `go()` 와 함께 `withRouter` 에서 지원하는 메서드이다. history, match, ... 를 props 로 가져올 수 있게 해준다.

### 🌴 이벤트 핸들러에 여러 개의 함수를 넣고 싶다!

```typescript
onClick: function(event){
      func1();
      func2();
   },
   render: function(){
      return (
         <tag onClick={this.onClick} />
			);
   }
```

여러 개의 함수/메서드를 하나로 묶어버린다.

한줄로 표현할 수 있다.

```typescript
<tag onClick={() => { func1(); func2(); }}/>
```

### 🌴 `<Link>` 에 Object 형태의 `props` 를 전달하고 싶다!

아무리 해도 안된다😢. Redux 를 쓰기로 결심했다!

### 🌴 이미지 파일을 POST 요청으로 저장하고 싶다!

🥥 파일 형태를 request 로 보낼 때

`FormData()` 로 보낸다. file 은 보통 `event.tartget.files` 안에 `Array` 형태로 들어있는데, 하나만 보낼 땐 `event.target.files[0]` 을 저장해서 보내면 되지만, 나는 전체 `files`가 들어있는 `FileList` 를 요청보내고 싶었다. 하지만 `FileList` 가 `FormData` 에 제대로 담기지 않는 문제를 겪었다.

```typescript
var value = e.target.files;
for (let i = 0; i < value.length; i++) {
    PostingActions.changeFileInput(value[i]);
}
```

`for` loop 로 파일들을 `[]`에 저장한 뒤,

```typescript
const files = new FormData()
for (let j = 0; j < selectedfiles.length; j++) {
    files.append("files", selectedfiles[j])
}
```

이 리스트 안의 파일들을 다시 `FormData` 에 저장한다.

```typescript
await axios.post(restBaseApi + "/rest/PostFile", files,
{
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token
    }
})
.then(res => {
    console.log(res)
})
.catch(err => console.log(err))
```

`files` 라는 이름으로 저장한 `FormData` 를 보낸다.

이 때, 헤더에 `"Content-Type": "multipart/form-data"` 를 쓰지 않으면 CORS 에러가 발생한다.

🥥 파일을, 여러개, 이미지만

```html
<input tyle="file" multiple accept="image/*"/>
```

html 태그를 위와 같이 작성한다.

### 🌴 번외. TypeScript 의 Date 를 yyyy-mm-dd 형식으로 만들기

매번 찾아볼 수 없어 한번 여기에 올리기로...

```typescript
dateFunc() {
    var date = new Date();
    var year = date.getFullYear();
    var month: string | number = (1 + date.getMonth())
    month = month >= 10 ? month : '0' + month;
    var day: string | number = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return  year + '' + month + '' + day;
  }
```



---

## 🤮 에러

### 🌵 `state` 에 있는 배열이 갱신되지 않는다!

TypeError: cannot read property “temp” of undefined

`react-infinite-scroll-component` 를 사용할 때,

`state` 에 `myArray`라는 배열을 선언하고, `interface` 에도 분명히 `Array<any>` 타입을 줬는데, `this.setState({ myArray: 들어갈 배열})` 을 해도 동작하지 않았다.

**최초는 들어가지만, 갱신이 안됨**

→ `this.setState({ myArray: this.state.myArray.concat(들어갈 배열)})` 로 추가한다. ( 파이썬에서 `myArray.add(들어갈 배열)` 느낌)

### 🌵 All files must be modules when the '-- isolatedModules' flag is provided

거의 빈 파일이 있을 때 발생했다.

파일을 삭제하거나 `import React from 'react'` 정도만 추가해도 잘 작동한다.

### 🌵 Objects are not valid as a React child (found: object with keys {}). ~~

말 그대로 `Object` 를 주면 안될 때.. 

- 변수 이름이 겹쳤을 때
- `object.key` 로 들어가야 하는데 object 를 내보내려고 했을 때

지금까지 발생한건 두 경우

### 🌵 Type 'string | ArrayBuffer | null' is not assignable to type 'string'

할당하려는 값이 해당 변수의 type 과 일치하지 않아 발생했다.

`myVarious: string | ArrayBuffer | null`  이렇게 선언해주니 해결되었다.

### 🌵 이미지를 업로드하기 전 프리뷰 하고 싶은데 `FileReader`  의 result 가 string 이 아니다!

뒤에 `as string` 을 붙였더니 간단하게 해결되었다.

```typescript
let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imagePreview: reader.result as string
            })
        }
```

### 🌵 TypeError: Failed to execute 'readAsDataURL' on 'FileReader': parameter 1 is not of type 'Blob'.

위의 코드를 테스트 중, 파일을 업로드 하지 않고 취소했을 때 발생했다.

`reader.onloadend` 는 파일이 로드됐을 때 실행하는 함수인데 파일이 없어서 그런게 아닐까 한다.

- 참고한 링크

  https://stackoverflow.com/questions/32508191/uncaught-typeerror-failed-to-execute-readasdataurl-on-filereader-parameter

파일이 있거나 image 형식이거나 할 때 등 검증이 필요하다.

```typescript
var file = e.target.files[0];
var reader = new FileReader();
if (file && file.type.match('image.*')) {
    reader.readAsDataURL(file);
    this.setState({
        selectedFile: file,
        imagePreview: reader.result as string })
}
```

위와 같이 조건문 안에서 file 이 있거나 이미지일 때만 작업을 수행하도록 했다.

이렇게 하니 파일을 업로드 하지 않아도 에러 없이 작동한다! ( 파일 선택창을 열었다가 취소하면 그냥 아무것도 하지 않는다. )

### 🌵 위의 코드가 `imagePreview` 를 제대로 못했다...

```typescript
var file = e.target.files[0];
        var reader = new FileReader();
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file);
            this.setState({selectedFile: file})
        }
        reader.onloadend = () => {
            this.setState({imagePreview: reader.result as string })
        }
```

- 🌴 `onloadend` 가 궁금하다!

  `onloadend` 는 `FileReader` 의 이벤트 핸들러 종류이다.

  🥕 **FileReader 객체**는 웹 애플리케이션이 비동기적으로 데이터를 읽기 위하여 읽을 파일을 가리키는File 혹은 Blob 객체를 이용해 파일의 내용을(혹은 raw data버퍼로) 읽고 사용자의 컴퓨터에 저장하는 것을 가능하게 해줍니다.

  File 객체는 <input> 태그를 이용하여 유저가 선택한 파일들의 결과로 반환된 FileList 객체, 드래그 앤 드랍으로 반환된 DataTransfer 객체 혹은 HTMLCanvasElement의 mozGetAsFile() API로 부터 얻습니다. (https://developer.mozilla.org/ko/docs/Web/API/FileReader)

  🥕**`FileReader.onloaden`**

  `loadend` 이벤트 핸들러. 이 이벤트는 읽기 동작이 끝났을 때마다 발생합니다. (읽기의 성공이나 실패 여부는 상관 않습니다.)

  🥕 **Blob 객체**는 파일과 흡사한 불변 객체로 raw data입니다. 데이터를 표현하기 때문에 필연적으로 자바스크립트 네이티브 포맷이 아닙니다. File 인터페이스는 기본적으로 Blob을 통해 이뤄지며, blob의 함수들을 상속받고 확장하여 사용자 시스템의 파일을 지원해줍니다. (https://developer.mozilla.org/ko/docs/Web/API/Blob)

### 🌵 Object is possibly 'null' 에러 무시해버리기

tsconfig.json 에 `"strictNullChecks": false,` 를 추가한다.
