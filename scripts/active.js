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
        

        _gameboardArray.forEach((e, index) => e.forEach((value, jndex) => transpose[jndex][index] = value));
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
        
        return [winCheck, rowCheck, columnCheck, diagCheck, winIndex];
    };
        
    const gameState = () => {
        return _gameboardArray;
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

    return {getToken, setToken, getWins, incrementWins};
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
        console.log(boardState);
        if (boardState[0] === 1) {elements.topLeftSquare.textContent = "X"} 
        else if (boardState[0] === -1){elements.topLeftSquare.textContent = "O"}
        else {elements.topLeftSquare.textContent = ""}
        if (boardState[1] === 1) {elements.topCenterSquare.textContent = "X"}
        else if (boardState[1] === -1){elements.topCenterSquare.textContent = "O"}
        else {elements.topCenterSquare.textContent = ""}
        if (boardState[2] === 1) {elements.topRightSquare.textContent = "X"} else if (boardState[2] === -1){elements.topRightSquare.textContent = "O"}
        else {elements.topRightSquare.textContent = ""}
        if (boardState[3] === 1) {elements.middleLeftSquare.textContent = "X"} else if (boardState[3] === -1){elements.middleLeftSquare.textContent = "O"}
        else {elements.middleLeftSquare.textContent = ""}
        if (boardState[4] === 1) {elements.middleCenterSquare.textContent = "X"} else if (boardState[4] === -1){elements.middleCenterSquare.textContent = "O"}
        else {elements.middleCenterSquare.textContent = ""}
        if (boardState[5] === 1) {elements.middleRightSquare.textContent = "X"} else if (boardState[5] === -1){elements.middleRightSquare.textContent = "O"}
        else {elements.middleRightSquare.textContent = ""}
        if (boardState[6] === 1) {elements.bottomLeftSquare.textContent = "X"} else if (boardState[6] === -1){elements.bottomLeftSquare.textContent = "O"}
        else {elements.bottomLeftSquare.textContent = ""}
        if (boardState[7] === 1) {elements.bottomCenterSquare.textContent = "X"} else if (boardState[7] === -1){elements.bottomCenterSquare.textContent = "O"}
        else {elements.bottomCenterSquare.textContent = ""}
        if (boardState[8] === 1) {elements.bottomRightSquare.textContent = "X"} else if (boardState[8] === -1){elements.bottomRightSquare.textContent = "O"}
        else {elements.bottomRightSquare.textContent = ""}
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
        GameBoard.clearBoard;
        DOM.displayGameState;
        initialize();
    });
    DOM.elements.p2Selection.addEventListener('click', e => {
        p2Choice= e.target.textContent;
        GameBoard.clearBoard;
        DOM.displayGameState;
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
        if (!(p1Choice === 'X' || p1Choice === 'O') && !(p2Choice === 'X' || p2Choice === 'O')) {
            DOM.elements.p2Container.classList.remove("highlight");
            DOM.elements.p1Container.classList.remove("inactive");
            DOM.elements.p1Container.classList.add("highlight");
            DOM.addText('Choose Player One');
            gameStarted = false;
        }
        if (!(p1Choice === 'X' || p1Choice === 'O') && (p2Choice === 'X' || p2Choice === 'O')) {
            DOM.elements.p2Container.classList.remove("highlight");
            DOM.elements.p1Container.classList.remove("inactive");
            DOM.elements.p1Container.classList.add("highlight");
            DOM.addText('Choose Player One');
            gameStarted = false;
        }
        if ((p1Choice === 'X' || p1Choice === 'O') && !(p2Choice === 'X' || p2Choice === 'O')) {
            DOM.elements.p1Container.classList.remove("highlight");
            DOM.elements.p2Container.classList.remove("inactive");
            DOM.elements.p2Container.classList.add("highlight");
            DOM.addText('Choose Player Two');
            gameStarted = false;
        }
        if ((p1Choice === 'X' || p1Choice === 'O') && (p2Choice === 'X' || p2Choice === 'O')) {
            DOM.elements.p1Container.classList.remove('highlight');
            DOM.elements.p2Container.classList.remove("highlight");
            DOM.elements.gameBoard.classList.remove('inactive');
            DOM.elements.gameBoard.classList.add('highlight');
            DOM.addText('Play Naughts & Crosses');
            playerOne = Player();
            playerTwo = Player();
            (p1Choice === 'X') ? playerOne.setToken(1) : playerOne.setToken(-1);
            (p2Choice === 'X') ? playerTwo.setToken(1) : playerTwo.setToken(-1);
            gameStarted = true;

        }
    }

    const playRound = function (location) {
        if (gameStarted) {
            currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
            GameBoard.makeMove(currentPlayer, location);
            DOM.displayGameState()
            if (GameBoard.checkBoard()[0]) endGame();
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


    return {initialize}
})();

let playerOne, playerTwo;
GameEngine.initialize();