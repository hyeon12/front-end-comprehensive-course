const hooks = [];
let currentCompoent = 0;

export class Component {
  constructor(props) {
    //class컴포넌트에 constructor은 함수컴포넌트에 함수의 역할을 함
    this.props = props;
  }
}

export function createDom(node) {
  //vdom은 전체를 뜻하니 node라는 변수명이 좋겠군
  //Dom을 만들려면 Dom api를 사용할 수 밖에 없음
  if (typeof node === "string") {
    //하위요소가 태그일땐 객체로 들어오는데 태그가 아니면 문자열로 들어옴
    return document.createTextNode(node);
    //문자열이면 Text컨텐츠로 넣어주기
  }
  const element = document.createElement(node.tag);
  //이렇게 만들어진 객체에 속성을 부여할려면 createElement가 반환한 객체를 이용해야해서 변수와 함께

  Object.entries(node.props).forEach(
    ([name, value]) =>
      //name과 value를 배열로 넘김
      element.setAttribute(name, value)
    //속성 넣어주기
  );

  node.children.map(createDom).forEach(element.appendChild.bind(element));
  //children이 있는지를 순회해서 객체가 있는지를 보고 처리를 순회
  //재귀호출 패턴
  //부모 앨리먼트에 자식요소로 새로만든 dom앨리먼트들이 샥샥 추가됨

  return element;
}

function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };
  const modifier = (nextValue) => {
    hooks[currentCompoent] = nextValue;
  };
  return [hooks[currentCompoent], modifier];
}

function useState(initValue) {
  let position = currentCompoent - 1;
  if (!hooks[position]) {
    hooks[position] = initValue;
  }
}

export function createEl(tag, props, ...children) {
  props = props || {}; //undefined나 null이 들어왔을 경우를 위한 방어코드

  if (typeof tag === "function") {
    if (tag.prototype instanceof Component) {
      //클래스라면
      const instance = new tag(makeProps(props, children));
      return instance.render();
    }
    hooks[currentCompoent] = null; //hook 세팅
    currentCompoent++;
    //일반함수라면
    if (children.length > 0) {
      return tag(makeProps(props, children));
      //함수컴포넌트가 호출된 다음에 hook이 함수 안에서 호출되서 인덱스가 맞아짐
    } else {
      return tag(props);
    }
  } else {
    return {
      //가변인자 children 배열이됨
      tag, //이름이 변수와 같으니 생략가능 tag: tag
      props,
      children,
      //Virtual DOM에 input데이터
      //객체의 특징은 트리구조를 가지고 있다는 것
    };
  }
}

export function render(vdom, container) {
  container.appendChild(createDom(vdom));
  //container에 자식 추가
  //바깥쪽에서 내부구조에 관심을 갖지 않게 함(알지 안아도 되게)
}

// export const render = (function () {
//   //업데이트할때마다 비교해서 이전과 비교하여 업데이트 된 부분은 업데이트
//   let prevDom = null;

//   return function (vdom, container) {
//     if (prevDom === null) {
//       prevDom = vdom;
//     }
//     //diff
//     container.appendChild(createDom(vdom));
//   };
// })();
