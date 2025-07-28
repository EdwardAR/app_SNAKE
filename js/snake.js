class Snake {
    constructor() {
        this.segments = [
            {x: 10, y: 10},
            {x: 9, y: 10},
            {x: 8, y: 10}
        ];
        this.direction = 'RIGHT';
        this.nextDirection = 'RIGHT';
        this.cellSize = canvas.width / 20; // 20x20 grid
    }

    update() {
        // Actualizar dirección
        this.direction = this.nextDirection;
        
        // Mover la serpiente
        const head = {...this.segments[0]};
        
        switch(this.direction) {
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'RIGHT':
                head.x += 1;
                break;
        }
        
        // Añadir nueva cabeza
        this.segments.unshift(head);
        // Eliminar cola (se elimina después si come)
    }

    draw(ctx) {
        ctx.fillStyle = '#4CAF50';
        this.segments.forEach(segment => {
            ctx.fillRect(
                segment.x * this.cellSize, 
                segment.y * this.cellSize, 
                this.cellSize - 2, 
                this.cellSize - 2
            );
        });
    }

    checkCollision() {
        const head = this.segments[0];
        
        // Paredes
        if (
            head.x < 0 || head.x >= canvas.width / this.cellSize ||
            head.y < 0 || head.y >= canvas.height / this.cellSize
        ) {
            return true;
        }
        
        // Colisión consigo misma
        for (let i = 1; i < this.segments.length; i++) {
            if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
                return true;
            }
        }
        
        return false;
    }

    grow() {
        // La serpiente crece al comer (no se elimina la cola en el próximo movimiento)
    }

    changeDirection(newDirection) {
        // Evitar movimiento opuesto
        if (
            (this.direction === 'UP' && newDirection !== 'DOWN') ||
            (this.direction === 'DOWN' && newDirection !== 'UP') ||
            (this.direction === 'LEFT' && newDirection !== 'RIGHT') ||
            (this.direction === 'RIGHT' && newDirection !== 'LEFT')
        ) {
            this.nextDirection = newDirection;
        }
    }
}