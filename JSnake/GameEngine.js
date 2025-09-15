// Game configuration constants
export const GAME_CONFIG = {
  SCREEN_WIDTH: 400,
  SCREEN_HEIGHT: 400,
  BACKGROUND_COLOR: '#090909',
  DANGER_COLOR: '#ef4444',
  TEXT_COLOR: '#ffffff',
  FPS: 10,
  TOP_BARRIER: 40  // Space below score for game area
};

// Game loop and rendering logic
export class GameEngine {
  constructor(canvas, gameObjects) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gameObjects = gameObjects;
    this.gameIsOn = false;
    this.gameOver = false;
    this.lastUpdate = 0;
  }

  draw() {
    const { snake, food, scoreboard } = this.gameObjects;

    // Clear canvas
    this.ctx.fillStyle = GAME_CONFIG.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, GAME_CONFIG.SCREEN_WIDTH, GAME_CONFIG.SCREEN_HEIGHT);

    // Draw top barrier line below score
    this.ctx.strokeStyle = '#333333';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(0, GAME_CONFIG.TOP_BARRIER);
    this.ctx.lineTo(GAME_CONFIG.SCREEN_WIDTH, GAME_CONFIG.TOP_BARRIER);
    this.ctx.stroke();

    // Draw game objects
    snake.draw(this.ctx);
    food.draw(this.ctx);
    scoreboard.draw(this.ctx);

    // Draw game over message
    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      this.ctx.fillRect(0, 0, GAME_CONFIG.SCREEN_WIDTH, GAME_CONFIG.SCREEN_HEIGHT);

      this.ctx.fillStyle = GAME_CONFIG.DANGER_COLOR;
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('GAME OVER', GAME_CONFIG.SCREEN_WIDTH / 2, GAME_CONFIG.SCREEN_HEIGHT / 2);

      this.ctx.fillStyle = GAME_CONFIG.TEXT_COLOR;
      this.ctx.font = '24px Arial';
      this.ctx.fillText('Press SPACE to restart', GAME_CONFIG.SCREEN_WIDTH / 2, GAME_CONFIG.SCREEN_HEIGHT / 2 + 50);
    }
  }

  gameLoop(timestamp) {
    if (this.lastUpdate === 0) {
      this.lastUpdate = timestamp;
      console.log('🎮 Game loop started!');
    }

    if (timestamp - this.lastUpdate >= 1000 / GAME_CONFIG.FPS) {
      if (!this.gameOver) {
        const { snake, food, scoreboard } = this.gameObjects;
        
        snake.move();

        if (snake.checkFoodCollision(food)) {
          food.refresh(GAME_CONFIG.SCREEN_WIDTH, GAME_CONFIG.SCREEN_HEIGHT, GAME_CONFIG.TOP_BARRIER);
          snake.extend();
          scoreboard.increaseScore();
          console.log(`Score: ${scoreboard.score}`);
        }

        if (snake.checkWallCollision(GAME_CONFIG.SCREEN_WIDTH, GAME_CONFIG.SCREEN_HEIGHT, GAME_CONFIG.TOP_BARRIER)) {
          this.gameOver = true;
          console.log('Wall collision - Game Over!');
        }

        if (snake.checkSelfCollision()) {
          this.gameOver = true;
          console.log('Self collision - Game Over!');
        }
      }

      this.draw();
      this.lastUpdate = timestamp;
    }

    if (this.gameIsOn) {
      requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
  }

  handleKeyboardInput(event) {
    const { controls, snake, scoreboard, food } = this.gameObjects;
    console.log(`Key pressed: ${event.key}`);
    
    // Prevent default browser behavior for arrow keys and space
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      event.preventDefault();
    }
    
    this.gameOver = controls.handleKeyboardInput(
      event, 
      snake, 
      this.gameOver, 
      [scoreboard, snake, food]
    );
  }

  start() {
    this.gameIsOn = true;
    this.gameOver = false;
    this.lastUpdate = 0;
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  stop() {
    this.gameIsOn = false;
  }

  restart() {
    this.gameOver = false;
    this.lastUpdate = 0;
    const { scoreboard, snake, food } = this.gameObjects;
    scoreboard.reset();
    snake.reset();
    food.refresh(GAME_CONFIG.SCREEN_WIDTH, GAME_CONFIG.SCREEN_HEIGHT, GAME_CONFIG.TOP_BARRIER);
  }
}