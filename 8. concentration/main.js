const $wrapper = document.querySelector('#wrapper');

const total = 12;

const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];
let completed = [];
function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1));
  }
}

function createCard(i) {
  const card = document.createElement('div');
  card.className = 'card'; // .card 태그 생성
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner'; // .card-inner 태그 생성
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front'; // .card-front 태그 생성
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back'; // .card-back 태그 생성
  cardBack.style.backgroundColor = shuffled[i];

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}

function onClickCard() {
  this.classList.toggle('flipped');
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
  const firstBackColor =
    clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor =
    clicked[1].querySelector('.card-back').style.backgroundColor;
  if (firstBackColor === secondBackColor) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    if (completed.length !== total) return;
    alert(`축하합니다!`);
    return;
  }

  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
  }, 800);
}

function startGame() {
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }
  document.querySelectorAll('.card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
  }, 5000);
}

startGame();
