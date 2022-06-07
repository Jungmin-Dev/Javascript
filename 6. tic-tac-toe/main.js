const data = [];
let turn = 'O';
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
let Random1 = Math.floor(Math.random() * 3);
let Random2 = Math.floor(Math.random() * 3);
let flag = true;
for (let i = 0; i < 3; i++) {
  data.push([]);
}

const callback = (event) => {
  if (!flag) {
    return;
  }
  turn = 'O';
  if (event.target.textContent) {
    console.log('빈칸이 아닙니다.');
    return;
  }
  console.log('빈칸입니다.');
  event.target.textContent = turn;
  // 승부 판단하기
  if (checkWinner(event.target)) {
    $result.textContent = `${turn}님이 승리`;
    $table.removeEventListener('click', callback);
    return;
  }
  // 무승부 검사
  let draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = `무승부`;
    return;
  }
  turn = turn === 'X' ? 'O' : 'X';
  flag = false;

  setTimeout(() => {
    if (!rows[Random1][Random2].textContent) {
      rows[Random1][Random2].textContent = turn;
    } else if (rows[Random1][Random2].textContent) {
      while (rows[Random1][Random2].textContent) {
        Random1 = Math.floor(Math.random() * 3);
        Random2 = Math.floor(Math.random() * 3);
      }
      rows[Random1][Random2].textContent = turn;
    }
    // 승부 판단하기
    if (checkWinner(rows[Random1][Random2])) {
      $result.textContent = `${turn}님이 승리`;
      $table.removeEventListener('click', callback);
      return;
    }
    // 무승부 검사
    draw = rows.flat().every((cell) => cell.textContent);
    if (draw) {
      $result.textContent = `무승부`;
      return;
    }
    turn = turn === 'X' ? 'O' : 'X';
    flag = true;
  }, 1000);
};

//[
//  [td, td, td],
//  [td, td, td],
//  [td, td, td],
//]
const checkWinner = (target) => {
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;

  // 세 칸 다 채워졌나?
  let hasWinner = false;
  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
};
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  $table.appendChild($tr);
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');
    $tr.appendChild($td);
    cells.push($td);
  }
  rows.push(cells);
}

$table.addEventListener('click', callback);
document.body.append($table);
document.body.append($result);
