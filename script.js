//step 1 : genrate random number of range [1,100]

let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);

const submit = document.querySelector('#subt'); //submit button
const userInput = document.getElementById('guessField'); //user input
const guessSlot = document.querySelector('.guesses'); //previous guesses slot
const remainig = document.querySelector('.lastResult'); //remainig chances of guess
let lowOrHigh = document.querySelector('.lowOrHi'); //to show that guess is low or high
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let numGuesses = 0;
let prevGuess = []; //to store guesses

let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = Number(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  //check karse ke guess valid chhe ke nai
  if (isNaN(guess)) {
    alert('Please Enter a valid Number');
  } else if (guess < 1) {
    alert('please Enter Number more then or Equal to 1');
  } else if (guess > 100) {
    alert('please Enter Number less then or Equal to 100');
  } else {
    prevGuess.push(guess);
    if (numGuesses === 10) {
      cleanUpGuess(guess);
      displayMessage(`Game Over.Random Number was ${randomNumber}`);
      endGame();
    } else {
      cleanUpGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  //it will check guess
  if (guess === randomNumber) {
    displayMessage(`you guessed it right`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is Too low`);
  } else {
    displayMessage(`Number is Too High`);
  }
}

function cleanUpGuess(guess) {
  //display guess
  userInput.value = '';
  guessSlot.innerHTML += ` ${guess}, `;
  numGuesses++;
  remainig.innerHTML = `${10 - numGuesses}`;
  if (remainig.innerHTML == 0) endGame();
}

function displayMessage(message) {
  lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', ''); //{key,value}
  p.classList.add('button');
  p.innerHTML = `<h2 id = "newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    userInput.value = '';
    prevGuess = [];
    guessSlot.innerHTML = '';
    lowOrHigh.innerHTML = '';
    numGuesses = 0;
    remainig.innerHTML = `${10}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}
