let word; // 제시어
let NewWord; // 새로 입력한 단어

const number = Number(prompt("몇 명이 참가하나요?"));
if (!number) {
  window.close();
}
const $button = document.querySelector("button");
const $word = document.querySelector("#word");
const $input = document.querySelector("input");
let people = document.querySelector("#order");

const onInput = (event) => {
  NewWord = event.target.value;
};

const onClickButton = () => {
  if (!word && NewWord.length === 3) {
    word = NewWord;
    $word.textContent = word;
    $input.value = "";
  } else {
    if (word[word.length - 1] === NewWord[0] && NewWord.length === 3) {
      word = NewWord;
      $word.textContent = word;
      $input.value = "";
      if (people.textContent < number)
        people.textContent = Number(people.textContent) + 1;
      else {
        people.textContent = 1;
      }
    } else {
      alert("틀렸습니다.");
      $input.value = "";
      $input.focus();
    }
  }
  $input.focus();
};

$input.addEventListener("input", onInput);
$button.addEventListener("click", onClickButton);
