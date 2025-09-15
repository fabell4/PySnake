// Snake movement constants
export const MOVE_DISTANCE = 20;
export const UP = 'UP';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

export class Snake {
  constructor() {
    this.cellSize = 20;
    this.segments = [];
    this.collisionDetected = false;
    this.heading = RIGHT;
    this.createSnake();
    this.head = this.segments[0];
  }

  createSnake() {
    const positions = [[0, 0], [-20, 0], [-40, 0]];
    positions.forEach(position => this.addSegment(position));
  }

  addSegment(position) {
    const segment = {
      x: 200 + position[0], // Center position
      y: 200 + position[1],
      width: this.cellSize,
      height: this.cellSize
    };
    this.segments.push(segment);
  }

  extend() {
    const lastSegment = this.segments[this.segments.length - 1];
    const lastPosition = [lastSegment.x - 300, lastSegment.y - 300];
    this.addSegment(lastPosition);
  }

  move() {
    for (let segNum = this.segments.length - 1; segNum > 0; segNum--) {
      const newX = this.segments[segNum - 1].x;
      const newY = this.segments[segNum - 1].y;
      this.segments[segNum].x = newX;
      this.segments[segNum].y = newY;
    }

    if (this.heading === UP) {
      this.head.y -= MOVE_DISTANCE;
    } else if (this.heading === DOWN) {
      this.head.y += MOVE_DISTANCE;
    } else if (this.heading === LEFT) {
      this.head.x -= MOVE_DISTANCE;
    } else if (this.heading === RIGHT) {
      this.head.x += MOVE_DISTANCE;
    }
  }

  up() {
    if (this.heading === DOWN && this.segments.length > 1) {
      this.collisionDetected = true;
    } else if (this.heading !== DOWN) {
      this.heading = UP;
    }
  }

  down() {
    if (this.heading === UP && this.segments.length > 1) {
      this.collisionDetected = true;
    } else if (this.heading !== UP) {
      this.heading = DOWN;
    }
  }

  left() {
    if (this.heading === RIGHT && this.segments.length > 1) {
      this.collisionDetected = true;
    } else if (this.heading !== RIGHT) {
      this.heading = LEFT;
    }
  }

  right() {
    if (this.heading === LEFT && this.segments.length > 1) {
      this.collisionDetected = true;
    } else if (this.heading !== LEFT) {
      this.heading = RIGHT;
    }
  }

  checkFoodCollision(food) {
    return (this.head.x === food.position[0] && this.head.y === food.position[1]);
  }

  checkWallCollision(screenWidth, screenHeight, topBarrier = 0) {
    return (this.head.x < 0 || 
            this.head.x >= screenWidth || 
            this.head.y < topBarrier ||  // Top barrier instead of 0
            this.head.y >= screenHeight);
  }

  checkSelfCollision() {
    if (this.collisionDetected) {
      return true;
    }

    const headPos = [this.head.x, this.head.y];
    for (let i = 1; i < this.segments.length; i++) {
      const segment = this.segments[i];
      if (headPos[0] === segment.x && headPos[1] === segment.y) {
        return true;
      }
    }
    return false;
  }

  reset() {
    this.segments = [];
    this.createSnake();
    this.head = this.segments[0];
    this.heading = RIGHT;
    this.collisionDetected = false;
  }

  draw(ctx) {
    ctx.fillStyle = '#22c55e'; // Green color
    this.segments.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, this.cellSize - 1, this.cellSize - 1);
    });
  }
}