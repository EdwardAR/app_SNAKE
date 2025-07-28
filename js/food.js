class Food {
    constructor() {
        this.position = {x: 0, y: 0};
        this.cellSize = canvas.width / 20; // Mismo grid que la serpiente
        this.color = '#FF5252';
        this.randomizePosition();
    }

    randomizePosition() {
        const gridSize = canvas.width / this.cellSize;
        this.position = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            (this.position.x * this.cellSize) + this.cellSize/2,
            (this.position.y * this.cellSize) + this.cellSize/2,
            this.cellSize/2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    checkCollision(snakeHead) {
        return this.position.x === snakeHead.x && this.position.y === snakeHead.y;
    }
}