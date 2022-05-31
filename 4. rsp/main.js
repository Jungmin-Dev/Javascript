const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');

const IMG_URL = './rsp.png';
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = 'auto 200px';

const rspX = {
  scissors: '0', // 가위
  rock: '-220px', // 바위
  paper: '-440px', //보
};

let computerChoice = 'scissors';

const changeComputerHand = () => {
  if (computerChoice === 'scissors') {
    // 가위면
    computerChoice = 'rock';
  } else if (computerChoice === 'rock') {
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'scissors';
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = 'auto 200px';
};
let intervalId = setInterval(changeComputerHand, 50);

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

let clickable = true;
let me = 0;
let computer = 0;
const clickButton = (event) => {
  if (clickable) {
    clearInterval(intervalId);
    clickable = false;
    // 점수 계산 및 화면 표시
    const myChoice =
      event.target.textContent === '바위'
        ? 'rock'
        : event.target.textContent === '가위'
        ? 'scissors'
        : 'paper';
    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;

    let message;
    // 2, -1은 승리조건이고, -2, 1은 패배조건, 점수표 참고
    if ([2, -1].includes(diff)) {
      me++;
      message = '나의 승리';
    } else if ([-2, 1].includes(diff)) {
      computer++;
      message = '컴퓨터의 승리';
    } else {
      message = '무승부';
    }
    if (me >= 2) {
      message = `나의 승리 `;
    } else if (computer >= 2) {
      message = `컴퓨터의 승리 `;
    } else {
      setTimeout(() => {
        clickable = true;
        intervalId = setInterval(changeComputerHand, 50);
      }, 1000);
    }
    $score.textContent = `${message}  ${me} : ${computer}`;
  }
};
$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);
