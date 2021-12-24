
// possible combinations to win
const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// varables to turn on css classes
// show symbols
const filledX = "x";
const filledO = "o";
//show hover effect
const turnX = "turnx";
const turnO = "turno";
// show message
const showMessage = "show";
// turn board to gray
const hideBoard = "hide";
// decide which player
let isTurnX;
let currentPlayer;

// reference
const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const messageBox = document.getElementById("message-box")
const message = document.querySelector(".message")
const button = document.getElementById("btn")

// START THE GAME
setupGame();

// define function to setup the game
function setupGame() {
    isTurnX = true
    currentPlayer = isTurnX ? turnX : turnO;
    messageBox.classList.remove(showMessage);
    board.classList.remove(turnO);
    board.classList.remove(hideBoard);
    board.classList.add(currentPlayer);
    cells.forEach(cell => {
        cell.classList.remove(filledX,filledO);
        cell.addEventListener('click', onClick, { once: true });
    });
};

// define the onClick function
function onClick(e) {
    const clickedCell = e.target;
    const markToPlace = isTurnX ? filledX : filledO;
    placeSymbol(clickedCell,markToPlace);
    displayMessage(checkWin(markToPlace),checkDraw(checkWin(markToPlace)));
    if (!checkWin(markToPlace) && !checkDraw(checkWin(markToPlace))) {
        changePlayer();
    };
};

// define function to place symbol
function placeSymbol(clickedCell,markToPlace) {
    clickedCell.classList.add(markToPlace);
};

function changePlayer() {
    isTurnX = !isTurnX;
    board.classList.remove(currentPlayer);
    currentPlayer = isTurnX ? turnX : turnO;
    board.classList.add(currentPlayer);
};

// function to check for win
function checkWin(markToPlace) {
    return winningComb.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(markToPlace);
        });
    });
};

// define function for winning messageBox
function displayMessage(isWin,isDraw) {
    if (isWin) {
        message.textContent = `Player ${isTurnX ? "&#10060 " : "&#11093 "} Wins!`;
        messageBox.classList.add(showMessage);
        board.classList.remove(turnO,turnX);
        board.classList.add(hideBoard);
        removeListeners();
    };
    if (isDraw) {
        message.textContent = "Draw!";
        messageBox.classList.add(showMessage);
        board.classList.remove(turnO,turnX);
        board.classList.add(hideBoard);
        removeListeners();
    };
};

// function to remove event listeners
function removeListeners() {
    cells.forEach(cell => {
        cell.removeEventListener("click",onClick);
    });
};

// function to check for draw
function checkDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(filledX) || cell.classList.contains(filledO);
    });
};

// add setupGame function to restart Button
button.addEventListener("click",setupGame);
