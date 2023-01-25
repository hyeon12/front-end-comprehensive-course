// Youtube IFrame API를 비동기로 로드합니다.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
  // onYouTubePlayerAPIReady 함수 이름은,
  // Youtube IFrame Player API에서 사용하는 이름이기 때문에,
  // 다르게 지정하면 동작하지 않음
  // 그리고 함수는 전역(Global) 등록해야 함
  new YT.Player("player", {
    //ex)<div id="player"><div>, id속성의 player 요소를 찾음
    videoId: "An6LvWQuj_8", // 최초 재생할 유튜브 영상 ID
    //watch?v=An6LvWQuj_8에서 An6LvWQuj_8
    //유튜브에서 소스코드 복사를 하면 제어가 안됨 출력만 하는 용도
    playerVars: {
      //영상을 재생하기 위한 여러가지 변수들
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무
      playlist: "An6LvWQuj_8", // 반복 재생할 유튜브 영상 ID 목록
    },
    events: {
      // 영상이 준비되었을 때,
      onReady: function (event) {
        event.target.mute(); // 음소거!
      },
    },
  });
}