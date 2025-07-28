// game.js - Versión corregida
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');

// Variables del juego
let snake, food, score;
let gameSpeed = 150;
let gameInterval;
let isPaused = false;
let gameStarted = false;

// Tamaño del canvas
function resizeCanvas() {
    const size = Math.min(window.innerWidth - 40, 600);
    canvas.width = size;
    canvas.height = size;
    if (snake) snake.cellSize = canvas.width / 20;
    if (food) food.cellSize = canvas.width / 20;
}

// Inicialización
function initGame() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    snake = new Snake();
    food = new Food();
    score = new Score();
    
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    
    // Controles móviles
    document.querySelector('.up').addEventListener('click', () => snake.changeDirection('UP'));
    document.querySelector('.down').addEventListener('click', () => snake.changeDirection('DOWN'));
    document.querySelector('.left').addEventListener('click', () => snake.changeDirection('LEFT'));
    document.querySelector('.right').addEventListener('click', () => snake.changeDirection('RIGHT'));
    
    // Controles de teclado
    document.addEventListener('keydown', handleKeyPress);
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startBtn.textContent = 'Reiniciar el juego';
        gameInterval = setInterval(gameLoop, gameSpeed);
    } else {
        resetGame();
        startGame();
    }
}

function gameLoop() {
    if (isPaused) return;
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    snake.update();
    
    if (snake.checkCollision()) {
        gameOver();
        return;
    }
    
    if (food.checkCollision(snake.segments[0])) {
        snake.grow();
        score.increase();
        food.randomizePosition();
    }
    
    food.draw(ctx);
    snake.draw(ctx);
}

function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

function resetGame() {
    clearInterval(gameInterval);
    snake = new Snake();
    food = new Food();
    score.reset();
    gameSpeed = 150;
    isPaused = false;
    gameStarted = false;
    startBtn.textContent = 'Empezar juego';
}

function gameOver() {
    clearInterval(gameInterval);
    setTimeout(() => {
        alert(`Juego terminado! Puntaje: ${score.currentScore}`);
        resetGame();
    }, 100);
}

function handleKeyPress(e) {
    if (!gameStarted) return;
    
    switch(e.key) {
        case 'ArrowUp': snake.changeDirection('UP'); break;
        case 'ArrowDown': snake.changeDirection('DOWN'); break;
        case 'ArrowLeft': snake.changeDirection('LEFT'); break;
        case 'ArrowRight': snake.changeDirection('RIGHT'); break;
        case ' ': togglePause(); break;
    }
}

// Iniciar al cargar
window.addEventListener('DOMContentLoaded', initGame);