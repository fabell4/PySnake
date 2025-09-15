export class Controls {
  constructor(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.touchStartPos = null;
    this.minSwipeDistance = 50;
  }

  handleKeyboardInput(event, snake, gameOver, gameObjects) {
    if (!gameOver) {
      if (event.key === 'ArrowUp') {
        snake.up();
      } else if (event.key === 'ArrowDown') {
        snake.down();
      } else if (event.key === 'ArrowLeft') {
        snake.left();
      } else if (event.key === 'ArrowRight') {
        snake.right();
      }
    } else {
      if (event.key === ' ') { // Space key
        this.restartGame(gameObjects);
        return false; // Return false to indicate gameOver should be false
      }
    }
    return gameOver;
  }

  restartGame(gameObjects) {
    const [scoreboard, snake, food] = gameObjects;
    scoreboard.reset();
    snake.reset();
    food.refresh();
  }

  // Touch controls for mobile devices
  handleTouchStart(event, gameOver) {
    if (!gameOver) {
      const touch = event.touches[0];
      this.touchStartPos = [touch.clientX, touch.clientY];
    }
  }

  handleTouchEnd(event, snake, gameOver, gameObjects) {
    if (!gameOver && this.touchStartPos) {
      const touch = event.changedTouches[0];
      const endX = touch.clientX;
      const endY = touch.clientY;

      const dx = endX - this.touchStartPos[0];
      const dy = endY - this.touchStartPos[1];

      // Check if it's a swipe
      if (Math.abs(dx) > this.minSwipeDistance || Math.abs(dy) > this.minSwipeDistance) {
        this.handleSwipe(dx, dy, snake);
      }
    } else if (gameOver) {
      this.restartGame(gameObjects);
      gameOver = false;
    }

    this.touchStartPos = null;
    return gameOver;
  }

  handleSwipe(dx, dy, snake) {
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        snake.right();
      } else {
        snake.left();
      }
    } else {
      if (dy > 0) {
        snake.down();
      } else {
        snake.up();
      }
    }
  }
}