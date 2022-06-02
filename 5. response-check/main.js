const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
let timeout;
const records = [];
$screen.addEventListener('click', (event) => {
  if (event.target.classList.contains('waiting')) {
    $screen.classList.remove('waiting');
    $screen.classList.add('ready');
    $screen.textContent = '초록색이 되면 클릭하세요.';
    timeout = setTimeout(() => {
      startTime = new Date();
      $screen.classList.remove('ready');
      $screen.classList.add('now');
      $screen.textContent = '클릭하세요!';
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (event.target.classList.contains('ready')) {
    clearTimeout(timeout);
    $screen.textContent = '너무 성급해요';
    $screen.classList.replace('ready', 'waiting');
  } else if (event.target.classList.contains('now')) {
    endTime = new Date();
    records.push(endTime - startTime);
    const TopFive = records.sort((a, b) => a - b).slice(0, 5);

    const average = records.reduce((a, c) => a + c) / records.length;

    $result.textContent = `현재 : ${
      endTime - startTime
    } ms, 평균 : ${average} ms `;

    TopFive.map((top, index) => {
      $result.append(document.createElement('br'), `${index + 1}위 : ${top}ms`);
    });
    $screen.classList.remove('now');
    $screen.classList.add('waiting');
    $screen.textContent = '클릭해서 시작하세요.';
  }
});
