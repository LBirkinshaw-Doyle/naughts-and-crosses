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
    }

    return {
        highlight,
        lowlight,
        //displayGameState,
        //displayWinner,
        elements
    }
})();