var snake = [{ top: 200, left: 200 }];
var direction = 'down';
var apple = { top: 100, left: 100 };
var gameBoard = document.getElementById('game-board');
var scoreDisplay = document.getElementById('score-display');
var pauseButton = document.getElementById('pause-button');
var restartButton = document.getElementById('restart-button');
var restartButtonModal = document.getElementById('restart-button-modal');
var paused = false;

function togglePause() {
    paused = !paused;
    if (paused) {
        clearInterval(gameInterval);
        pauseButton.textContent = 'Resume Game';
    } else {
        gameInterval = setInterval(gameLoop, speed);
        pauseButton.textContent = 'Pause Game';
    }
}
const upButton = document.querySelector('.arrow-button.up');
const downButton = document.querySelector('.arrow-button.down');
const leftButton = document.querySelector('.arrow-button.left');
const rightButton = document.querySelector('.arrow-button.right');

upButton.addEventListener('click', () => direction = 'up');
downButton.addEventListener('click', () => direction = 'down');
leftButton.addEventListener('click', () => direction = 'left');
rightButton.addEventListener('click', () => direction = 'right');


pauseButton.onclick = togglePause;
restartButton.onclick = resetGame;
restartButtonModal.onclick = resetGame;

scoreDisplay.id = 'score-display';
gameBoard.appendChild(scoreDisplay);
var score = 0;
var gameOverModal = document.getElementById('game-over-modal');
var speed = 200; // Initial speed

function resetGame() {
    snake = [{ top: 200, left: 200 }];
    direction = 'down';
    apple = { top: 100, left: 100 };
    score = 0;
    updateScoreDisplay();
    speed = 200; // Reset speed to initial value
    clearInterval(gameInterval); // Clear existing interval
    gameInterval = setInterval(gameLoop, speed); // Set interval with updated speed
    gameOverModal.style.display = 'none';
}

function updateScoreDisplay() {
    scoreDisplay.textContent =score;
if (score % 5 === 0 && score !== 0) {
        alertScore();
    }
}
function alertScore() {
    var alertBox = document.createElement('div');
    alertBox.textContent = 'Score: ' + score;
    alertBox.style.position = 'fixed';
    alertBox.style.left = '50%';
    alertBox.style.bottom = '0'; // Position the dialog box at the bottom
    alertBox.style.transform = 'translateX(-50%)'; // Center the dialog box
    alertBox.style.padding = '20px';
    alertBox.style.backgroundColor = 'purple';
    alertBox.style.color = 'white';
    alertBox.style.border = '1px solid black';
    alertBox.style.fontFamily = 'Times New Roman';
    document.body.appendChild(alertBox);
    // Removed the setTimeout function to disable the self-closing functionality
}



function increaseSpeed() {
    if (score > 0 && score % 10 === 0) {
        speed *= 0.9; // Increase speed by 10%
        clearInterval(gameInterval); // Clear existing interval
        gameInterval = setInterval(gameLoop, speed); // Set interval with updated speed
    }
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            direction = 'left';
            break;
        case 38:
            direction = 'up';
            break;
        case 39:
            direction = 'right';
            break;
        case 40:
            direction = 'down';
            break;
    }
};

function gameLoop() {
    var head = Object.assign({}, snake[0]); // copy head
    switch (direction) {
        case 'left':
            head.left -= 20;
            break;
        case 'up':
            head.top -= 20;
            break;
        case 'right':
            head.left += 20;
            break;
        case 'down':
            head.top += 20;
            break;
    }updateScoreDisplay();
    if (head.top >= gameBoard.offsetHeight || head.top < 0 || head.left >= gameBoard.offsetWidth || head.left < 0) {
    document.getElementById('modal-score').textContent = score;
    gameOverModal.style.display = 'block';

    return;
}
    if (head.top == apple.top && head.left == apple.left) {
        apple.top = Math.floor(Math.random() * gameBoard.offsetHeight/20) * 20;
        apple.left = Math.floor(Math.random() * gameBoard.offsetWidth/20) * 20;
        score++;
        updateScoreDisplay();
        increaseSpeed(); // Check if speed should be increased
    } else {
        snake.pop();
    }
   for (var i = 0; i < snake.length; i++) {
    if (snake[i].top === head.top && snake[i].left === head.left) {
        document.getElementById('modal-score').textContent = score;
        gameOverModal.style.display = 'block';
        return;
    }
}
    snake.unshift(head);
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    snake.forEach(function(dot) {
        var dotElement = document.createElement('div');
        dotElement.className = 'dot';
        dotElement.style.top = `${dot.top}px`;
        dotElement.style.left = `${dot.left}px`;
        gameBoard.appendChild(dotElement);
    });
    var appleElement = document.createElement('div');
    appleElement.className = 'apple';
    appleElement.style.top = `${apple.top}px`;
    appleElement.style.left = `${apple.left}px`;
    gameBoard.appendChild(appleElement);
}

var gameInterval = setInterval(gameLoop, speed);
resetGame();
