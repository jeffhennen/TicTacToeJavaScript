const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#Info');
const resetButton = document.querySelector('#ResetButton');
resetButton.addEventListener('click', resetGame);
const startCells = ["", "", "", "", "", "", "", "", ""];


let turn; //Circle's Turn is turn == 0, X turn is turn == 1
infoDisplay.textContent = "Circle goes first";

function startGame(){

  turn = 0;
  infoDisplay.textContent = "Circle goes first";
  startCells.forEach((_cell, index) => {

    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', takeTurn);
    gameBoard.append(cellElement);
  });
}



function takeTurn(e){

  const goDisplay = document.createElement('div');
  goDisplay.classList.add(turn == 0 ? 'circle' :  'cross');
  e.target.append(goDisplay);
  turn = turn === 0 ? 1 : 0;
  infoDisplay.textContent = (turn === 0 ? "Circle's turn" : "X's turn");
  e.target.removeEventListener('click', takeTurn);

  checkScore();
}

function checkScore(){

  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],//Horizontal
    [0,4,8], [6,4,2],         //Diagonal
    [0,3,6], [1,4,7], [2,5,8] //Vertical
  ]

  const allSquares = document.querySelectorAll(".square");
  
  let circleWin = false;
  let crossWin = false;
  winningCombos.forEach(array =>{

    
    array.forEach(cell =>{

      circleWin = checkWin(allSquares, array, 'circle');
    });

    if(circleWin){

      infoDisplay.textContent = "Circle Wins, refresh to play again";
      console.log("Circle Wins, refresh to play again");
      endGame(allSquares);
      return;
    }
  });

  winningCombos.forEach(array =>{

   
    array.every(cell =>{

      crossWin = checkWin(allSquares, array, 'cross');

    });

    if(crossWin){

      infoDisplay.textContent = "cross Wins, refresh to play again";
      console.log("Cross Wins, refresh to play again");
      endGame(allSquares);
      return;
    }
  });

  //Check for Draw
  let checkFilledBoard = true;
  for(let x = 0; x < 9; x++){

    if(allSquares[x].childNodes.length == 0){
      
      checkFilledBoard = false;
      break;
    }
  }

  if( checkFilledBoard == true && !circleWin && !crossWin){

    infoDisplay.textContent = "This game is a draw, refresh to play again";
    console.log("This game is a draw, refresh to play again");
    endGame(allSquares);
  }
}

function endGame(allSquares){

  allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
}



function checkWin(allSquares, array, player){

  if(allSquares[array[0]].firstChild?.classList.contains(player) && 
     allSquares[array[1]].firstChild?.classList.contains(player) &&
     allSquares[array[2]].firstChild?.classList.contains(player)){

    return true;

  }else{

    return false;
  }
}

function resetGame(){

  let allSquares = document.querySelectorAll('.square');
  allSquares.forEach(square => gameBoard.removeChild(square));
  startGame();
}

startGame();
