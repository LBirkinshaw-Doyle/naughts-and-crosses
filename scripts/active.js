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
        let winIndex;
        let winner;
        let transpose;

        _gameboardArray.forEach((e, index) => e.forEach((value, jndex) => transpose[jndex][index] = value));
        _gameboardArray.forEach((e, index) => {
            if (e.reduce((previousValue, currentValue) => previousValue + currentValue) === 3){rowCheck = true; winIndex = index; winner = 1;} 
            else if (e.reduce((previousValue, currentValue) => previousValue + currentValue) === -3){rowCheck = true; winIndex = index; winner = -1;}
        });
        transpose.forEach((e, index) => {
            if (e.reduce((previousValue, currentValue) => previousValue + currentValue) === 3){columnCheck = true; winIndex = index; winner = 1;} 
            else if (e.reduce((previousValue, currentValue) => previousValue + currentValue) === -3){columnCheck = true; winIndex = index; winner = -1;}            
        });
        let diagSum = [
            _gameboardArray[0][0] + _gameboardArray[1][1] + _gameboardArray[2][2],
            _gameboardArray[2][0] + _gameboardArray[1][1] + _gameboardArray[0][2]
        ];
        diagSum.forEach((e, i) => {
            if (e === 3) {diagCheck = true; winIndex = i; winner = 1;}
            else if (e === -3) {diagCheck = true; winIndex = i; winner = -1;}
        });
        
        return [rowCheck, columnCheck, diagCheck, winIndex, winner];
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
        if (boardState[0] === 1) {elements.topLeftSquare.textContent = "X"} else if (boardState[0] === -1){elements.topLeftSquare.textContent = "O"}
        if (boardState[1] === 1) {elements.topCenterSquare.textContent = "X"} else if (boardState[1] === -1){elements.topCenterSquare.textContent = "O"}
        if (boardState[2] === 1) {elements.topRightSquare.textContent = "X"} else if (boardState[2] === -1){elements.topRightSquare.textContent = "O"}
        if (boardState[3] === 1) {elements.middleLeftSquare.textContent = "X"} else if (boardState[3] === -1){elements.middleLeftSquare.textContent = "O"}
        if (boardState[4] === 1) {elements.middleCenterSquare.textContent = "X"} else if (boardState[4] === -1){elements.middleCenterSquare.textContent = "O"}
        if (boardState[5] === 1) {elements.middleRightSquare.textContent = "X"} else if (boardState[5] === -1){elements.middleRightSquare.textContent = "O"}
        if (boardState[6] === 1) {elements.bottomLeftSquare.textContent = "X"} else if (boardState[6] === -1){elements.bottomLeftSquare.textContent = "O"}
        if (boardState[7] === 1) {elements.bottomLeftSquare.textContent = "X"} else if (boardState[7] === -1){elements.bottomCenterSquare.textContent = "O"}
        if (boardState[8] === 1) {elements.bottomRightSquare.textContent = "X"} else if (boardState[8] === -1){elements.bottomRightSquare.textContent = "O"}
    }
    const displayWinner = function(winningPlayer) {
        let winningToken;
        (winningPlayer.getToken() === -1) ? winningToken = O : winningToken = X;

        let winMessage = winningToken + " wins!";
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
    let p1Choice, p2Choice;
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

    const initialize = function () {
        if (!(p1Choice === 'X' || p1Choice === 'O') && !(p2Choice === 'X' || p2Choice === 'O')) {
            if (DOM.elements.p1Container.classList.contains("highlight")) {DOM.elements.p1Container.classList.remove("highlight")};
            if (DOM.elements.p2Container.classList.contains("highlight")) {DOM.elements.p2Container.classList.remove("highlight")};
            DOM.elements.p1Container.classList.remove("inactive");
            DOM.elements.p1Container.classList.add("highlight");
            DOM.addText('Choose Player One');
        }
        if (!(p1Choice === 'X' || p1Choice === 'O') && (p2Choice === 'X' || p2Choice === 'O')) {
            if (DOM.elements.p2Container.classList.contains("highlight")) {DOM.elements.p2Container.classList.remove("highlight")}
            DOM.elements.p1Container.classList.remove("inactive");
            DOM.elements.p1Container.classList.add("highlight");
            DOM.addText('Choose Player One');
        }
        if ((p1Choice === 'X' || p1Choice === 'O') && !(p2Choice === 'X' || p2Choice === 'O')) {
            if (DOM.elements.p1Container.classList.contains("highlight")) {DOM.elements.p1Container.classList.remove("highlight")}
            DOM.elements.p2Container.classList.replace("inactive", "highlight");
            DOM.addText('Choose Player Two');
        }
        if ((p1Choice === 'X' || p1Choice === 'O') && (p2Choice === 'X' || p2Choice === 'O')) {
            if (DOM.elements.p1Container.classList.contains("highlight")) {DOM.elements.p1Container.classList.remove("highlight")};
            if (DOM.elements.p2Container.classList.contains("highlight")) {DOM.elements.p2Container.classList.remove("highlight")};
            DOM.elements.gameBoard.classList.remove('inactive');
            DOM.elements.gameBoard.classList.add('highlight');
            DOM.addText('Play Naughts & Crosses');
            playerOne = Player();
            playerTwo = Player();
            (p1Choice === 'X') ? playerOne.setToken(1) : playerOne.setToken(-1);
            (p2Choice === 'X') ? playerTwo.setToken(1) : playerTwo.setToken(-1);
            playRound();
        }
    }

    const playRound = function () {
        
    }


    return {initialize}
})();

let playerOne, playerTwo;
GameEngine.initialize();