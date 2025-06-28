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

   //Displays printed borard 
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

//Function that switches between player
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
    
function winningContitions(board) {
    // if((board[0][0] === 'X') && (board[0][1] === 'X') && (board[0][2] === 'X') || (board[0][0] === 'O') && (board[0][1] === 'O') && (board[0][2] === 'O') ||
    //     (board[1][0] === 'X') && (board[1][1] === 'X') && (board[1][2] === 'X') || (board[1][0] === 'O') && (board[1][1] === 'O') && (board[1][2] === 'O')){
    //     console.log('You are winner')
    // }
    
};


  
    return{addToken, switchPlayers, winningContitions}
};

const gameOn = gameControll();

gameOn.addToken(1,0);
gameOn.addToken(0,1);
gameOn.addToken(1,2);
gameOn.addToken(0,0);
gameOn.addToken(2,0);
gameOn.addToken(0,2);

gameOn.winningContitions();
// Gameboard.printBoard()