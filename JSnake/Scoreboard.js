export class Scoreboard {
  constructor() {
    this.score = 0;
    this.highScore = this.readHighScore();
  }

  readHighScore() {
    try {
      const highScore = localStorage.getItem('snake_high_score');
      return highScore ? parseInt(highScore) : 0;
    } catch {
      return 0;
    }
  }

  increaseScore() {
    this.score += 1;
  }

  reset() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      try {
        localStorage.setItem('snake_high_score', this.highScore.toString());
      } catch {
        // Fail silently if localStorage is not available
      }
    }
    this.score = 0;
  }

  draw(ctx) {
    ctx.fillStyle = '#ffffff'; // White color
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${this.score} High Score: ${this.highScore}`, 10, 30);
  }
}