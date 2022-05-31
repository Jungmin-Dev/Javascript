const $button = document.querySelector("#check");
const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("#logs");

// 중복되지 않는 초기 숫자 4자리 뽑기
//1. 숫자를 뽑는다.
//2. 그 전 숫자들이랑 겹치는지 확인
//3. 숫자 입력
let strike = 0;
let ball = 0;
let out = 0;
let numbers = [];
const answer = [];
const tries = []; // 시도한 값
for (let n = 0; n < 9; n++) numbers.push(n + 1);

for (let n = 0; n < 4; n++) {
  const index = Math.floor(Math.random() * (numbers.length - n));
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer.join(""));

// 입력값 검증
const checkInput = (input) => {
  if (input.length !== 4) {
    return alert("4자리 숫자를 입력해 주세요");
  }
  if (new Set(input).size !== 4) {
    return alert("중복되지 않게 입력해 주세요.");
  }
  if (tries.includes(input)) {
    return alert("이미 시도한 값입니다.");
  }
  return true;
};

$form.addEventListener("submit", (event) => {
  event.preventDefault(); // 기본 동작 막기
  const value = event.target[0].value;
  event.target[0].value = "";
  if (!checkInput(value)) return;
  // 입력값 비교
  if (answer.join("") === value) {
    $logs.textContent = "홈런";
  }
  if (tries.length >= 9) {
    defeated();
    return;
  }

  for (let i = 0; i < answer.length; i++) {
    let index = value.indexOf(answer[i]);
    // 일치한 값이 있을 때
    if (index > -1) {
      if (index === i) {
        strike++;
      } else ball++;
    }
  }
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}: ${out} 아웃`, document.createElement("br"));
  } else {
    $logs.append(
      `${value}: ${strike} 스트라이크 ${ball} 볼`,
      document.createElement("br")
    );
  }
  if (out === 3) {
    defeated();
    return;
  }
  tries.push(value);
});

const defeated = () => {
  const message = document.createTextNode(
    `패배! 정답은 ${answer.join(``)}이였습니다.`
  );
  $logs.appendChild(message);
};
