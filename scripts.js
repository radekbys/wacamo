const boardCells = document.querySelectorAll(".game-board > div");
const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const backdrop = document.querySelector(".backdrop");
const scoreParagraph = document.querySelector(".popup-text");
const popupButton = document.querySelector(".popup-button");

// global variables
let monkeyIndex = 0;
let round = 0;
let score = 0;
let endGameFlag = true;

//this function is run after the user clicks the monkey in time
const clickMonkey = (event) =>{
  if(round !==this.thisRound){
    return;
  }
  round++;
  score += 1;
  event.target.removeEventListener("click", clickMonkey);
  event.target.style["background-image"] = `none`;
  boardCells[monkeyIndex].style["background-color"] = `green`;
  setTimeout(() => {
    boardCells[monkeyIndex].style["background-color"] = `transparent`;
    if(endGameFlag) {
      return;
    }
    randomizeMonkey();
  }, 1000);
}

//this function is run when previous monkey disappears and new is generated
function randomizeMonkey() {
  this.thisRound = round;
  monkeyIndex = Math.floor(Math.random() * 25);
  const monkeyLifespan = Math.floor(Math.random() * 3000);

  boardCells[monkeyIndex].style["background-image"] = `url('chimpanzee.png')`;
  boardCells[monkeyIndex].addEventListener("click", clickMonkey);
  setTimeout(() => {
    if(this.thisRound !== round) {
      return;
    }
    round++;
    boardCells[monkeyIndex].removeEventListener("click", clickMonkey);
    boardCells[monkeyIndex].style["background-image"] = `none`;
    boardCells[monkeyIndex].style["background-color"] = `red`;
    setTimeout(() => {
      boardCells[monkeyIndex].style["background-color"] = `transparent`;
      if(endGameFlag) {
        return;
      }
      randomizeMonkey();
    }, 1000);
  }, monkeyLifespan);
}

// shows popup with score
function showPopup() {
  backdrop.style["display"] = "flex";
  scoreParagraph.innerText = `Your score: ${score}`;
}


//starting sequence run when the start button is clicked
function stopGame() {
  round++;
  endGameFlag = true;
  boardCells[monkeyIndex].removeEventListener("click", clickMonkey);
  boardCells[monkeyIndex].style["background-color"] = `transparent`;
  boardCells[monkeyIndex].style["background-image"] = `none`;
  stopButton.style["display"] = "none";
  startButton.style["display"] = "block";
  showPopup();
};

//finishing sequence ran when the stop button is clicked
function startGame() {
  round = 0;
  score = 0;
  endGameFlag = false;
  stopButton.style["display"] = "block";
  startButton.style["display"] = "none";
  randomizeMonkey();
};

function hidePopup(){
  backdrop.style["display"] = "none";
}


startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
popupButton.addEventListener("click", hidePopup);
