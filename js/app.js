/*
 * Create a list that holds all of your cards
 */
 let afterToggled = [];
 let cardMoves = 0;
 let clockOff = true;
 let countTime = 0;
 let setClock;
 let matchedPair = 0;
 let totalPairs = 8;
 let cards = document.querySelector(".deck");


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */





function shuffleAllCards(){
  let allCards = Array.from(document.querySelectorAll('.deck li'));
  let shuffleCards = shuffle(allCards);
  for (card of shuffleCards){
    cards.appendChild(card);
  }
}

shuffleAllCards();

function toggleCard(card){
   card.classList.toggle("open");
   card.classList.toggle("show");
}

function addToggle(clickCards){
   afterToggled.push(clickCards);
   console.log(afterToggled);
}

function cardMatchChecking(){
  if(
    afterToggled[0].firstElementChild.className === afterToggled[1].firstElementChild.className)
    {
    afterToggled[0].classList.toggle("match");
    afterToggled[1].classList.toggle("match");
    afterToggled = [];
    matchedPair++;

setTimeout(function(){
		CheckWin();
  }, 200);

}else{
  setTimeout(() =>{
    console.log("Not a Match!");
    toggleCard(afterToggled[0]);
    toggleCard(afterToggled[1]);
    afterToggled = [];
   // checkWin();
},1000);

}
}

function moveCards(){
  cardMoves++;
  let addMoves = document.querySelector(".moves");
  addMoves.innerHTML = cardMoves;
}

function finalScore(){
if (cardMoves === 16 || cardMoves === 24){
  removeStar();
}
}

function removeStar(){
  let allStars = document.querySelectorAll(".stars li");
  for(star of allStars){
    if (star.style.display !== "none"){
      star.style.display = "none";
      break;
    }
  }
}

function isClickValid(clickCards){
  return(
  clickCards.classList.contains("card") &&
    !clickCards.classList.contains("match") &&
    afterToggled.length < 2 &&
    !afterToggled.includes(clickCards)
     );
 }

function startClock(){
  setClock = setInterval(() =>{
    countTime++;
    console.log(countTime);
    displayTime();
}, 1000);
}

function displayTime(){
  let clocks = document.querySelector(".clock");
  let minutes = Math.floor(countTime / 60);
  let seconds = countTime % 60;
if (seconds < 10){
  clocks.innerHTML = `${minutes}:0${seconds}`;
}else{
  clocks.innerHTML = `${minutes}:${seconds}`;
}
console.log(clocks);
}

function stopClock(){
clearInterval(setClock);
}

function medalToggle(){
  let showMedal = document.querySelector(".medal_bg");
  showMedal.classList.toggle("hide");
}
medalToggle();
medalToggle();

function writeMedals(){
  let timeStat = document.querySelector(".medal_time");
  let clockTime = document.querySelector(".clock").innerHTML;
  let movesStat = document.querySelector(".medal_moves");
  let starsStat = document.querySelector(".medal_stars");
  let stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${cardMoves}`;
  starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars(){
  stars = document.querySelectorAll(".stars li");
  starCount = 0;
  for (star of stars) {
    if(star.style.display !== "none") {
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}

document.querySelector(".medal_cancel").addEventListener("click", medalToggle);

document.querySelector(".medal_replay").addEventListener("click", replayGame);

document.querySelector(".restart").addEventListener("click", resetGame);

function resetGame(){
  afterToggled = [];
  matchedPair = 0;
  resetClock();
  resetMoves();
  resetStars();
  shuffleAllCards();
  resetCards();
}

function resetClock(){
  stopClock();
  clockOff = true;
  countTime = 0;
  displayTime();
}

function resetMoves(){
  cardMoves = 0;
  document.querySelector(".moves").innerHTML = cardMoves;
}

function resetStars(){
  stars = 0;
  let allStars = document.querySelectorAll(".stars li");
  for (star of allStars){
      star.style.display = "inline";
    }
}

function CheckWin(){
	if(matchedPair === totalPairs){
		gameOver();
	}
}

function gameOver(){
  stopClock();
  writeMedals();
  medalToggle();
  resetCards();
}

function replayGame(){
  resetGame();
  medalToggle();
  resetCards();
}

function resetCards(){
  let cardAll = document.querySelectorAll('.deck li');
  for (let card of cardAll) {
    card.className ="card";
  }
}

cards.addEventListener("click", event =>{
 let clickCards = event.target;
  if (isClickValid(clickCards)){
    if (clockOff){
      startClock();
      clockOff = false;
    }
    toggleCard(clickCards);
    addToggle(clickCards);
    if(afterToggled.length === 2){
      cardMatchChecking(clickCards);
      moveCards();
      finalScore();
      //console.log("2 cards!");
    }
  }
  });
