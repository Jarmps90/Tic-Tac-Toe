let winner = false;
const players = [];

const startButton = () => {
    const startBtn = document.querySelector('.startBtn');
    const modal = document.querySelector('#modal');
    startBtn.addEventListener('click' , () => {
        modal.showModal();
        addPlayerNames();
        if(startBtn.parentNode) {
            startBtn.parentNode.removeChild(startBtn);
        }
    });
};


function divCreate() {
    const container = document.querySelector('#mainContainer');
    const turn = document.createElement('div');
    const mainBody = document.createElement('div');
    const winnerBoard = document.createElement('div');
    
    turn.classList.add('turn');
    mainBody.classList.add('mainBody');
    winnerBoard.classList.add('winnerBoard')
   
    container.appendChild(turn);
    container.appendChild(mainBody);
    container.appendChild(winnerBoard);
    
};

const Gameboard = (function() {
  const rows = 3;
  const colums = 3;
  const gameBoard = [];

  for(let i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for(let j = 0; j < colums; j++) {
      gameBoard[i].push(cell())
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

function cell() {
    let value = 0;

};

function addPlayerNames() {
    const button = document.querySelector('.confirm');

    button.addEventListener('click', () => {
        const player1 = document.querySelector('#playerOne').value;
        const player2 = document.querySelector('#playerTwo').value;
        players.push(player1, player2);
        divCreate();
        domLogic();
    })
};





function gameControll() {
    const board = Gameboard.getBoard()
    let movesCount = 0;

  

    const createPlayer = (name, marker) => {
        const playerName = name;
        const playerMarker = marker;

        return {playerName, playerMarker};
    }

   
    const playerOne = createPlayer(players[0], 'X');
    const playerTwo = createPlayer(players[1], 'O');
    
    
    let activePlayer = playerOne;
    


    const switchPlayers = () => {
        if(activePlayer === playerOne) {
            activePlayer = playerTwo;
        
        } else if(activePlayer === playerTwo) {
            activePlayer = playerOne;
    }};

    const getActivePlayer = () => activePlayer.playerName; 


    const addToken = (row, colum) => {
        
      if((board[row][colum] === playerOne.playerMarker) || (board[row][colum] === playerTwo.playerMarker)) {
            return console.log('This is invalid move')
        } else {
            board[row][colum] = activePlayer.playerMarker;
            movesCount++;
           
            return switchPlayers();
            
            
    }
};



function winningContitions() {
   
  const winnerText = document.querySelector('.winnerBoard')
   
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
            thirdRow[i] = board[2][i];
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
            diagonal1[l] = board[l][2];
        };
        for(let a = 0, b = 1, c = 2; a < board.length; a++) {
            diagonal2[0] = board[a][0];
            diagonal2[1] = board[b][1];
            diagonal2[2] = board[0][c];
           
        };
      
        
        return{diagonal1, diagonal2};
    };
    
    const row = rows();
    const colum = columns();
    const diagonal = diagonals();

    if((row.firstRow.every(isX) === true) || (row.secondRow.every(isX) === true) ||
        (row.thirdRow.every(isX) === true) || (colum.firstColumn.every(isX) === true) ||
        (colum.secondColumn.every(isX) === true) || (colum.thirdColumn.every(isX) === true) ||
        (diagonal.diagonal1.every(isX) === true) || (diagonal.diagonal2.every(isX) === true)) {

        winner = true;
       
        return winnerText.textContent = `${playerOne.playerName} is winner!`;       
            
    } else if((row.firstRow.every(isO) === true) || (row.secondRow.every(isO) === true) ||
                (row.thirdRow.every(isO) === true) || (colum.firstColumn.every(isO) === true) ||
                (colum.secondColumn.every(isO) === true) || (colum.thirdColumn.every(isO) === true) ||
                (diagonal.diagonal1.every(isO) === true) || (diagonal.diagonal2.every(isO) === true)) {

        winner = true;
      
        return winnerText.textContent = `${playerTwo.playerName} is winner!`;
    
    } else if(movesCount === 9) {
        winner = true;
        return winnerText.textContent = 'Its a tie'
    } else {
        winner = false;
    }
    
    };
    
    
    return{addToken, switchPlayers, winningContitions, getActivePlayer}
};


function domLogic() {
    const gameOn = gameControll();
    const board = Gameboard.getBoard();
    const container = document.querySelector('.mainBody');
    const currentTurn = document.querySelector('.turn')
   
    let count = 0;
    
    const updateScreen = () => {
        let count = 0;
        container.textContent = '';
        board.forEach((row) => {
            row.forEach(cell => {
                
                const cellBtn = document.createElement('button');
                cellBtn.classList.add('cell');
                [board].map(item => {
                    count++
                })
                
                cellBtn.dataset.cell = count;
                cellBtn.textContent = cell
                container.appendChild(cellBtn);
              
                    
                
            })
        })
        currentTurn.textContent = `${gameOn.getActivePlayer()}'s turn`;
    };
   
    
    
  

    function clicker(e) {
       
        const btn = e.target.dataset.cell;
        const button = document.querySelector('.confirm');
        button.disabled = true;
    if(winner === false) {
        if(btn === '1') {
            gameOn.addToken(0,0)
        } else if(btn === '2') {
            gameOn.addToken(0,1)
        } else if(btn === '3') {
            gameOn.addToken(0,2)
        } else if(btn === '4') {
            gameOn.addToken(1,0)
        } else if(btn === '5') {
            gameOn.addToken(1,1)
        } else if(btn === '6') {
            gameOn.addToken(1,2)
        } else if(btn === '7') {
            gameOn.addToken(2,0)
        } else if(btn === '8') {
            gameOn.addToken(2,1)
        } else if(btn === '9') {
            gameOn.addToken(2,2)
        };
    };
        updateScreen();
        gameOn.winningContitions()
    };
    container.addEventListener('click', clicker) 
    
    
    updateScreen();
    
 };




startButton();


