const githubLink = document.querySelector("#github-link");
const githubLogo = document.querySelector("#github-logo");
githubLink.addEventListener("pointerenter", () => githubLogo.style.transform = "rotate(540deg)");
githubLink.addEventListener("pointerleave", () => githubLogo.style.transform = "rotate(0deg)");

const GameBoard = (() => {
    let _gameboardArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const makeMove = (player, location) => {
        let row = location[0];
        let column = location[1];

        _gameboardArray[row][column] = player.getToken();
    };

    const clearBoard = () => {
        _gameboardArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }

    const checkBoard = () => {
        let rowCheck=false;
        let columnCheck=false;
        let diagCheck=false;
        let transpose=[[],[],[]];
        let winCheck;
        let winIndex;
        let drawCheck;
        

        _gameboardArray.forEach((e, index) => e.forEach((value, jndex) => transpose[jndex][index] = value)); // transpose the gameboard array to check columns easily
        _gameboardArray.forEach((e, index) => {
            if (e.reduce((previousValue, currentValue) => previousValue + currentValue) === 3){rowCheck = true; winIndex = index;} 
            else if (e.reduce((previousValue, currentValue) => previousValue + currentValue) === -3){rowCheck = true; winIndex = index;}
        });
        transpose.forEach((e, index) => {
            if (e.reduce((previousValue, currentValue) => previousValue + currentValue) === 3){columnCheck = true; winIndex = index;} 
            else if (e.reduce((previousValue, currentValue) => previousValue + currentValue) === -3){columnCheck = true; winIndex = index;}            
        });
        let diagSum = [
            _gameboardArray[0][0] + _gameboardArray[1][1] + _gameboardArray[2][2],
            _gameboardArray[2][0] + _gameboardArray[1][1] + _gameboardArray[0][2]
        ];
        diagSum.forEach((e, i) => {
            if (e === 3) {diagCheck = true; winIndex = i;}
            else if (e === -3) {diagCheck = true; winIndex = i;}
        });
        (rowCheck||columnCheck||diagCheck) ? winCheck=true : winCheck=false;
        (_gameboardArray.flat().includes(0)) ? drawCheck=false : drawCheck=true;
        
        return [winCheck, drawCheck, rowCheck, columnCheck, diagCheck, winIndex];
    };
        
    const gameState = () => {
        return _gameboardArray.slice();
    };

    return {
        makeMove,
        checkBoard,
        clearBoard,
        gameState,
    };
})();

const Player = () => {
    let _token = 0;
    const getToken = () => _token;
    const setToken = (token) => _token = token;

    let _wins = 0;
    const getWins = () => _wins;
    const incrementWins = () => _wins++;

    let _computerControl = false;
    const setComputerControl = () => _computerControl = true;
    const clearComputerControl = () => _computerControl = false;
    const isComputerControl = () => _computerControl

    return {getToken, setToken, getWins, incrementWins, setComputerControl, clearComputerControl, isComputerControl};
}

const DOM = (() => {

    const highlight =  function(element) {
        element.classList.remove("inactive");
        element.classList.add("highlight");
    }
    const lowlight = function(element) {
        element.classList.remove('highlight');
    }
    const addText = function(textString) {
        elements.title.textContent = textString;
    }
    const displayGameState = function() {
        let boardState = GameBoard.gameState().flat();
        if (boardState[0] === 1) {elements.topLeftSquare.firstChild.textContent = "X"} 
        else if (boardState[0] === -1){elements.topLeftSquare.firstChild.textContent = "O"}
        else {elements.topLeftSquare.firstChild.textContent = ""}
        if (boardState[1] === 1) {elements.topCenterSquare.firstChild.textContent = "X"}
        else if (boardState[1] === -1){elements.topCenterSquare.firstChild.textContent = "O"}
        else {elements.topCenterSquare.firstChild.textContent = ""}
        if (boardState[2] === 1) {elements.topRightSquare.firstChild.textContent = "X"}
        else if (boardState[2] === -1){elements.topRightSquare.firstChild.textContent = "O"}
        else {elements.topRightSquare.firstChild.textContent = ""}
        if (boardState[3] === 1) {elements.middleLeftSquare.firstChild.textContent = "X"}
        else if (boardState[3] === -1){elements.middleLeftSquare.firstChild.textContent = "O"}
        else {elements.middleLeftSquare.firstChild.textContent = ""}
        if (boardState[4] === 1) {elements.middleCenterSquare.firstChild.textContent = "X"}
        else if (boardState[4] === -1){elements.middleCenterSquare.firstChild.textContent = "O"}
        else {elements.middleCenterSquare.firstChild.textContent = ""}
        if (boardState[5] === 1) {elements.middleRightSquare.firstChild.textContent = "X"}
        else if (boardState[5] === -1){elements.middleRightSquare.firstChild.textContent = "O"}
        else {elements.middleRightSquare.firstChild.textContent = ""}
        if (boardState[6] === 1) {elements.bottomLeftSquare.firstChild.textContent = "X"}
        else if (boardState[6] === -1){elements.bottomLeftSquare.firstChild.textContent = "O"}
        else {elements.bottomLeftSquare.firstChild.textContent = ""}
        if (boardState[7] === 1) {elements.bottomCenterSquare.firstChild.textContent = "X"}
        else if (boardState[7] === -1){elements.bottomCenterSquare.firstChild.textContent = "O"}
        else {elements.bottomCenterSquare.firstChild.textContent = ""}
        if (boardState[8] === 1) {elements.bottomRightSquare.firstChild.textContent = "X"}
        else if (boardState[8] === -1){elements.bottomRightSquare.firstChild.textContent = "O"}
        else {elements.bottomRightSquare.firstChild.textContent = ""}
    }
    const displayWinner = function(winningPlayer) {
        let winningToken;
        (winningPlayer.getToken() === -1) ? winningToken = "O" : winningToken = "X";

        let winMessage = winningToken + " wins! Click here to play again.";
        addText(winMessage);
    }
    const elements = {
        p1Container: document.getElementById('player-one-container'),
        p1Selection: document.getElementById('player-one-choice'),
        p2Container: document.getElementById('player-two-container'),
        p2Selection: document.getElementById('player-two-choice'),
        gameBoard: document.getElementById('game-board'),
        topLeftSquare: document.getElementById('top-left'),
        topCenterSquare: document.getElementById('top-center'),
        topRightSquare: document.getElementById('top-right'),
        middleLeftSquare: document.getElementById('middle-left'),
        middleCenterSquare: document.getElementById('middle-center'),
        middleRightSquare: document.getElementById('middle-right'),
        bottomLeftSquare: document.getElementById('bottom-left'),
        bottomCenterSquare: document.getElementById('bottom-center'),
        bottomRightSquare: document.getElementById('bottom-right'),
        title: document.getElementById('title'),
    }

    return {
        highlight,
        lowlight,
        addText,
        displayGameState,
        displayWinner,
        elements
    }
})();

const GameEngine = (() => {
    let p1Choice, p2Choice, currentPlayer, gameStarted, gameEnded;
    DOM.elements.p1Selection.addEventListener('click', e => {
        p1Choice = e.target.textContent;
        GameBoard.clearBoard();
        DOM.displayGameState();
        initialize();
    });
    DOM.elements.p2Selection.addEventListener('click', e => {
        p2Choice= e.target.textContent;
        GameBoard.clearBoard();
        DOM.displayGameState();
        initialize();
    });
    DOM.elements.topLeftSquare.addEventListener('click', () => {
        if (gameStarted && DOM.elements.topLeftSquare.textContent === "") playRound([0, 0]);
    });
    DOM.elements.topCenterSquare.addEventListener('click', () => {
        if (gameStarted && DOM.elements.topCenterSquare.textContent === "") playRound([0, 1]);
    });
    DOM.elements.topRightSquare.addEventListener('click', () => {
        if (gameStarted && DOM.elements.topRightSquare.textContent === "") playRound([0, 2]);
    });
    DOM.elements.middleLeftSquare.addEventListener('click', () => {
        if (gameStarted && DOM.elements.middleLeftSquare.textContent === "") playRound([1, 0]);
    });
    DOM.elements.middleCenterSquare.addEventListener('click', () => {
        if (gameStarted && DOM.elements.middleCenterSquare.textContent === "") playRound([1, 1]);
    });
    DOM.elements.middleRightSquare.addEventListener('click', () => {
        if (gameStarted && DOM.elements.middleRightSquare.textContent === "") playRound([1, 2]);
    });
    DOM.elements.bottomLeftSquare.addEventListener('click', () => {
        if (gameStarted && DOM.elements.bottomLeftSquare.textContent === "") playRound([2, 0]);
    });
    DOM.elements.bottomCenterSquare.addEventListener('click', () => {
        if (gameStarted && DOM.elements.bottomCenterSquare.textContent === "") playRound([2, 1]);
    });
    DOM.elements.bottomRightSquare.addEventListener('click', () => {
        if (gameStarted && DOM.elements.bottomRightSquare.textContent === "") playRound([2, 2]);
    });
    DOM.elements.title.addEventListener('click', () => {
        if (gameEnded) {
            currentPlayer = undefined;
            gameEnded = false;
            initialize();
        };
    })

    const initialize = function () {
        if (!(p1Choice === 'X' || p1Choice === 'O' || p1Choice === 'Computer') && !(p2Choice === 'X' || p2Choice === 'O' || p2Choice === 'Computer')) {
            DOM.elements.gameBoard.classList.remove('highlight');
            DOM.elements.gameBoard.classList.add('inactive');
            DOM.elements.p2Container.classList.remove("highlight");
            DOM.elements.p1Container.classList.remove("inactive");
            DOM.elements.p1Container.classList.add("highlight");
            DOM.addText('Choose Player One');
            gameStarted = false;
        }
        if (!(p1Choice === 'X' || p1Choice === 'O' || p1Choice === 'Computer') && (p2Choice === 'X' || p2Choice === 'O' || p2Choice === 'Computer')) {
            DOM.elements.p2Container.classList.remove("highlight");
            DOM.elements.p1Container.classList.remove("inactive");
            DOM.elements.p1Container.classList.add("highlight");
            DOM.addText('Choose Player One');
            gameStarted = false;
        }
        if ((p1Choice === 'X' || p1Choice === 'O' || p1Choice === 'Computer') && !(p2Choice === 'X' || p2Choice === 'O' || p2Choice === 'Computer')) {
            DOM.elements.p1Container.classList.remove("highlight");
            DOM.elements.p2Container.classList.remove("inactive");
            DOM.elements.p2Container.classList.add("highlight");
            DOM.addText('Choose Player Two');
            gameStarted = false;
        }
        if ((p1Choice === 'X' || p1Choice === 'O' || p1Choice === 'Computer') && (p2Choice === 'X' || p2Choice === 'O' || p2Choice === 'Computer')) {
            DOM.elements.p1Container.classList.remove('highlight');
            DOM.elements.p2Container.classList.remove("highlight");
            DOM.elements.gameBoard.classList.remove('inactive');
            DOM.elements.gameBoard.classList.add('highlight');
            DOM.addText('Player 1 to go!');
            playerOne = Player();
            playerTwo = Player();
            if (p1Choice === 'Computer') {
                playerOne.setComputerControl();
                if (p2Choice === 'Computer') {
                    playerOne.setToken(1);
                    playerTwo.setComputerControl();
                    playerTwo.setToken(-1);
                    gameStarted = true;
                    playComputerRound();
                }
                else {
                    p2Choice === 'X' ? playerTwo.setToken(1) : playerTwo.setToken(-1);
                    p2Choice === 'X' ? playerOne.setToken(-1) : playerOne.setToken(1);
                    gameStarted = true;
                    playComputerRound();
                }
            }
            else if (p2Choice === 'Computer') {
                playerTwo.setComputerControl();
                p1Choice === 'X' ? playerOne.setToken(1) : playerOne.setToken(-1);
                p1Choice === 'X' ? playerTwo.setToken(-1) : playerTwo.setToken(1);
                gameStarted = true;
            }
            else {(p1Choice === 'X') ? playerOne.setToken(1) : playerOne.setToken(-1);
                (p2Choice === 'X') ? playerTwo.setToken(1) : playerTwo.setToken(-1);
                gameStarted = true;
            }

        }
    }

    const playRound = function (location) {
        let nextPlayer;
        if (gameStarted) {
            currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
            currentPlayer === playerOne ? nextPlayer = playerTwo : nextPlayer = playerOne;
            GameBoard.makeMove(currentPlayer, location);
            DOM.displayGameState()
            currentPlayer === playerOne ? DOM.addText('Player 2 to go!') : DOM.addText('Player 1 to go!');
            if (GameBoard.checkBoard()[0]) endGame();
            else if (GameBoard.checkBoard()[1]) drawGame();
            else if (nextPlayer.isComputerControl()) playComputerRound();
        }
    }

    const playComputerRound = function () {
        let nextPlayer;
        let move;
        if (gameStarted) {
            currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
            currentPlayer === playerOne ? nextPlayer = playerTwo : nextPlayer = playerOne;
            move = Computer.determineMove(currentPlayer.getToken());
            GameBoard.makeMove(currentPlayer, move);
            DOM.displayGameState()
            currentPlayer === playerOne ? DOM.addText('Player 2 to go!') : DOM.addText('Player 1 to go!');
            if (GameBoard.checkBoard()[0]) endGame();
            else if (GameBoard.checkBoard()[1]) drawGame();
            else if (nextPlayer.isComputerControl()) playComputerRound();
        }
    }

    const endGame = function () {
        gameStarted = false;
        gameEnded = true;
        currentPlayer === playerOne ? playerOne.incrementWins() : playerTwo.incrementWins();
        DOM.displayWinner(currentPlayer);
        GameBoard.clearBoard();
        DOM.displayGameState();
    }

    const drawGame = function () {
        gameStarted = false;
        gameEnded = true;
        DOM.addText("It's a draw! Click here to play again!");
        GameBoard.clearBoard();
        DOM.displayGameState();
    }


    return {initialize}
})();

const Computer = (() => {
    function determineMove(token) {
        let player;
        let opponent;
        let choice =[];
        let currentBoard = GameBoard.gameState().flat();

        if (token === 1) {
            player = "X"
            opponent = "O"
        }
        else {
            opponent = "X"
            player = "O"
        }

        currentBoard.forEach((value, index) => {
            value === 1 ? board[index] = "X": 
            value === -1 ? board[index] = "O" : board[index] = "";
        })

        minimax(board, 0, player, opponent);

        choice[0] = Math.floor(move / 3);
        choice[1] = move % 3;
        
        return choice;
    }

    let move;

    const board = {0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: ""}

    const gameOver = function (board) {
        return !Object.values(board).includes("")
    }

    const win = function (board, token) {

        let row1 = board[0] === token && board[1] === token && board[2] === token;
        let row2 = board[3] === token && board[4] === token && board[5] === token;
        let row3 = board[6] === token && board[7] === token && board[8] === token;
        let col1 = board[0] === token && board[3] === token && board[6] === token;
        let col2 = board[1] === token && board[4] === token && board[7] === token;
        let col3 = board[2] === token && board[5] === token && board[8] === token;
        let dia1 = board[0] === token && board[4] === token && board[8] === token;
        let dia2 = board[2] === token && board[4] === token && board[6] === token;

    

        return row1 || row2 || row3 || col1 || col2 || col3 || dia1 || dia2
    }

    const getMoves = function (board) {
        let moves = []
        for (property in board) {
            if (board[property] === "") {moves.push(property);}
        }
        return moves;
    }

    function score (board, player, opponent, depth) {
        if (win(board, player)) return 10-depth; 
        else if (win(board, opponent)) return depth-10;
        else return 0;
    }

    function newBoard (board, move, token) {
        let newState = Object.assign({}, board);
        newState[move] = token;
        return newState;
    }

    function minimax (board, depth, player, opponent, currentToken="") {
        let currentBoard = {}
        Object.assign(currentBoard, board); //wtaf
        let nextBoard;
        let scores = [];
        let moves = [];

        if (gameOver(currentBoard)||win(currentBoard, player)||win(currentBoard, opponent)) {
            return score(currentBoard, player, opponent, depth)
        }

        depth += 1;
        currentToken === player ? currentToken = opponent : currentToken = player;

        getMoves(currentBoard).forEach((move) => {
            nextBoard = newBoard(currentBoard, move, currentToken); 
            scores.push(minimax(nextBoard, depth, player, opponent, currentToken)); 
            moves.push(move);
        })

        if (currentToken === player) {
            let maxIndex = scores.indexOf(Math.max(...scores)); //PROBLEM HERE
            move = moves[maxIndex];
            return scores[maxIndex];
        }
        else {
            let minIndex = scores.indexOf(Math.min(...scores));
            move = moves[minIndex];
            return scores[minIndex];
        }
    }



    return {determineMove}
})();

let playerOne, playerTwo;
GameEngine.initialize();