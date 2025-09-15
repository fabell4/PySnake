export class Food {
  constructor() {
    this.cellSize = 20;
    this.refresh(400, 400, 0); // Default parameters for initial positioning
  }

  refresh(screenWidth = 400, screenHeight = 400, topBarrier = 0) {
    const gridWidth = Math.floor(screenWidth / this.cellSize);
    const gridHeight = Math.floor(screenHeight / this.cellSize);
    const topBarrierGrid = Math.ceil(topBarrier / this.cellSize);
    
    const x = Math.floor(Math.random() * gridWidth) * this.cellSize;
    const y = (Math.floor(Math.random() * (gridHeight - topBarrierGrid)) + topBarrierGrid) * this.cellSize;
    this.position = [x, y];
  }

  draw(ctx) {
    ctx.fillStyle = '#ef4444'; // Red color
    ctx.fillRect(this.position[0], this.position[1], this.cellSize - 1, this.cellSize - 1);
  }
}