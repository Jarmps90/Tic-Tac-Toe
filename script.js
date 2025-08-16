const Gameboard = (function() {
  const rows = 3;
  const colums = 3;
  const gameBoard = [];

  for(let i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for(let j = 0; j < colums; j++) {
      gameBoard[i].push(0)
    };
  };
  
  const getBoard = () => gameBoard;

   //Displays printed board 
    const printBoard = () => {
        for(let row of gameBoard) {
            const rowString = row.join(' ')
            console.log(rowString)
        }
    };
   
    return {getBoard, printBoard}
})();



function gameControll() {
    const board = Gameboard.getBoard()
    
//Module that defines palyers 
  
    const players = {
        playerOne : 'X',
        playerTwo : 'O'
        };
    const {playerOne, playerTwo} = players;

    let activePlayer = playerOne;

//Function that switches between players
//Add check that palyer is placed token and then switch
    const switchPlayers = () => {
        if(activePlayer === playerOne) {
            activePlayer = playerTwo;
        
        } else if(activePlayer === playerTwo) {
            activePlayer = playerOne;
    }};

//Module that adds tokkens
    const addToken = (row, colum) => {
        
      if((board[row][colum] === playerOne) || (board[row][colum] === playerTwo)) {
            return console.log('This is invalid move')
        } else {
            board[row][colum] = activePlayer;
            return switchPlayers();
      }
    };
    
function winningContitions() {
   
   //Try to add some empty check before winning contidions checks
   
    if(!board.length) return;

    const isX = (arr) => arr === 'X';
    const isO = (arr) => arr === 'O';

    function rows() {
        const firstRow = [];
        const secondRow = [];
        const thirdRow = [];

        for(let i = 0; i < 3; i++) {
            firstRow[i] = board[0][i];
            secondRow[i] = board[1][i];
            thirdRow[i] = board[1][i];
        };

        return{firstRow, secondRow, thirdRow};
    };
    
    function columns() {
        const firstColumn = [];
        const secondColumn = [];
        const thirdColumn = [];

        for(let i = 0; i < board.length; i++) {
            firstColumn[i] = board[i][0];
            secondColumn[i] = board[i][1];
            thirdColumn[i] = board[i][2];
        };
        return{firstColumn, secondColumn, thirdColumn};
    };

    function diagonals() {
        const diagonal1 = [];
        const diagonal2 = [];

        for(let i = 0, k = 1, l = 2; i < board.length; i++) {
            diagonal1[i] = board[i][0];
            diagonal1[k] = board[k][1];
            diagonal1[l] = board[k][2];
        };
        for(let a = 0, b = 1, c = 2; a < board.length; a++) {
            diagonal2[0] = board[0][a];
            diagonal2[1] = board[b][1];
            diagonal2[2] = board[c][0];
        };
        return{diagonal1, diagonal2};
    };

    const row = rows();
    const colum = columns();
    const diagonal = diagonals();

    if((row.firstRow.every(isX) === true) || (row.firstRow.every(isO) === true) ||
        (row.secondRow.every(isX) === true) || (row.secondRow.every(isO) === true) ||
        (row.thirdRow.every(isX) === true) || (row.thirdRow.every(isO) === true) ||
        (colum.firstColumn.every(isX) === true) || (colum.firstColumn.every(isO) === true) ||
        (colum.secondColumn.every(isX) === true) || (colum.secondColumn.every(isO) === true) ||
        (colum.thirdColumn.every(isX) === true) || (colum.thirdColumn.every(isO) === true) ||
        (diagonal.diagonal1.every(isX) === true) || (diagonal.diagonal1.every(isO) === true) ||
        (diagonal.diagonal2.every(isX) === true) || (diagonal.diagonal2.every(isO) === true)) {
       return console.log('You are winner')
    };
    
    };
    return{addToken, switchPlayers, winningContitions}
};

const gameOn = gameControll();


gameOn.winningContitions();
Gameboard.printBoard()