'use strict';
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;

const init = function () {
  //Starting conditions
  scores = [0, 0]; //Total scores of the players
  currentScore = 0; //curent score of the player
  activePlayer = 0; //activePlayer can be 0 or 1;
  playing = true; //We are playing the game and can press the buttons

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating the random dice roll
    //   const randomNumber = Math.round(Math.random() * 6);
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.display the dice
    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      console.log(currentScore);
      //trick:
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore; //change later
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to total score
    console.log('Hold button!');
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if active player's score is >=100
    if (scores[activePlayer] >= 10) {
      //a)Finish the game
      playing = false; //igra je zavrsena, ne mozemo da pritiskamo dugmad
      console.log('Ovaj je pobednik!');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //   document.querySelector('.dice').classList.add('hidden');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener(
  'click',
  init
  //   document
  //     .querySelector(`.player--${activePlayer}`)
  //     .classList.remove('player--winner');
  //   document
  //     .querySelector(`.player--${activePlayer}`)
  //     .classList.remove('player--active');
  //Moje resenje za resetovanje igre:
  //   location.reload();
);

// const initialiseGame = function () {

//   activePlayer = 0;
//   switchPlayer();
//   playing = true;
//   //   document.getElementById(`score--${activePlayer}`).textContent = 0;
// };
