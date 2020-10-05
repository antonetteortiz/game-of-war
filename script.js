console.log("Begin battle by calling: battle()");

let suits = ["hearts", "clubs", "diamonds", "spade"];
let cardFace = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "K",
  "Q",
  "A",
];
let cards = [];
let players = [[], []];
let firstRound = true;
let gameover = false;

//functions
function battle() {
  if (firstRound) {
    firstRound = false;
    buildCards();
    shuffleArray(cards);
    dealCards(cards);
  }
  attack();
}

function buildCards() {
  cards = [];
  for (let s in suits) {
    let suitNew = suits[s][0].toUpperCase();
    for (let n in cardFace) {
      let card = {
        suit: suits[s],
        num: cardFace[n],
        cardValue: parseInt(n) + 2,
        icon: suitNew,
      };
      cards.push(card);
    }
  }
  console.log("Begin Game");
  console.log(cards);
}

function dealCards(array) {
  for (let i = 0; i < array.length; i++) {
    let m = i % 2;
    players[m].push(array[i]);
  }
}

function shuffleArray(array) {
  for (let x = array.length - 1; x > 0; x--) {
    let ii = Math.floor(Math.random() * (x + 1));
    let temp = array[x];
    array[x] = array[ii];
    array[ii] = temp;
  }
  console.log("Shuffle Deck");
  return array;
}

function battlemode(pot) {
  let card0, card1;
  let topCard0, topCard1;
  for (let i = 0; i < 4; i++) {
    card0 = players[0].shift();
    if (i == 0) {
      topCard0 = card0;
    }
    pot = pot.concat(card0);
  }
  for (let i = 0; i < 4; i++) {
    card1 = players[1].shift();
    if (i == 0) {
      topCard1 = card1;
    }
    pot = pot.concat(card1);
  }
  if (topCard0 == undefined || topCard1 == undefined) {
    gameover();
  } else {
    checkWinner(topCard0, topCard1, pot);
  }
}

function gameOver() {
  if (players[0].length == 0) {
    console.log("You lose Player 1, Game Over");
  } else if (players[1].length == 0) {
    console.log("You lose Player 2, Game Over");
  } else {
    console.log("Continue Battle");
    battle();
  }
}

function attack() {
  let card1 = players[0].shift();
  let card2 = players[1].shift();
  let pot = [card1, card2];
  //check for winners
  checkWinner(card1, card2, pot);
  console.log(players[0].length);
  console.log(players[1].length);
  gameOver();
}

function checkWinner(card1, card2, pot) {
  console.log(card1, card2);
  if (card1.cardValue > card2.cardValue) {
    console.log("hand 1 wins");
    players[0] = players[0].concat(pot);
  } else if (card1.cardValue < card2.cardValue) {
    console.log("hand 2 wins");
    players[1] = players[1].concat(pot);
  } else {
    battlemode(pot);
    console.log("Battle Mode");
  }
  console.log(players);
}
