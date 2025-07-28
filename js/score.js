class Score {
    constructor() {
        this.currentScore = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.updateDisplay();
    }

    increase(points = 10) {
        this.currentScore += points;
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            localStorage.setItem('snakeHighScore', this.highScore);
        }
        this.updateDisplay();
    }

    reset() {
        this.currentScore = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('score').textContent = `Puntaje: ${this.currentScore}`;
        document.getElementById('high-score').textContent = `Puntuación alta: ${this.highScore}`;
    }
}