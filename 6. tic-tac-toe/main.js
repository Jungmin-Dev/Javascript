const data = [];
let turn = 'O';

const callback = (event) => {
  if (event.target.textContent) {
    console.log('빈칸이 아닙니다.');
    return;
  }
  console.log('빈칸입니다.');
  event.target.textContent = turn;
  if (turn === 'O') {
    turn = 'X';
  } else if (turn === 'X') {
    turn = 'O';
  }
};

for (let i = 0; i < 3; i++) {
  data.push([]);
}
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
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
