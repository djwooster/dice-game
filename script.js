'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

// starting states
let bigScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gameState = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

/*--------------------------------------------------------starting conditions--------------------------------------------------------*/

const init = function () {
  gameState = true;
  activePlayer = 0;
  currentScore = 0;
  bigScores = [0, 0];
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  document.getElementById('current--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
};

init();

/*--------------------------------------------------------rolling functionality--------------------------------------------------------*/

rollBtn.addEventListener('click', function () {
  if (gameState) {
    // 1. generate a random dice roll

    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    // 2. display dice

    diceEl.classList.remove('hidden');

    // dynamically displaying the src image with a template literal

    diceEl.src = `dice-${dice}.png`;

    // 3. if number rolled === 1; switch to next player

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch to next player

      diceEl.classList.add('hidden');

      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (gameState) {
    // add current score to big score
    bigScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      bigScores[activePlayer];

    diceEl.classList.add('hidden');

    // check if score === 100

    if (bigScores[activePlayer] >= 40) {
      document.getElementById(
        `name--${activePlayer}`
      ).textContent = `Player ${activePlayer} wins!`;
      gameState = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
