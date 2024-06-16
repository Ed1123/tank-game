import { Bullet, Tank } from './models.js';
import { rand, randColor, randInt } from './utils/rand.js';

const TANK_HEIGHT = 20;
const TANK_WIDTH = 20;

const CANVAS = document.querySelector('canvas');
const CTX = CANVAS.getContext('2d');

const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;

function generateRandTanks(ctx, n, speed) {
  const randTanks = [];
  for (let i = 0; i < n; i++) {
    const tank = new Tank(
      ctx,
      rand(TANK_WIDTH / 2, CANVAS_WIDTH - (3 * TANK_WIDTH) / 2),
      rand(TANK_HEIGHT / 2, CANVAS_HEIGHT - (3 * TANK_HEIGHT) / 2),
      ['up', 'right', 'left', 'down'][randInt(0, 4)],
      randColor(),
      speed,
      TANK_HEIGHT,
      TANK_WIDTH
    );
    randTanks.push(tank);
  }
  return randTanks;
}

class Game {
  constructor(ctx, enemiesCount, enemiesSpeed, userSpeed) {
    this.ctx = ctx;
    this.mainTank = new Tank(
      ctx,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - (3 / 2) * TANK_HEIGHT,
      'down',
      'white',
      userSpeed,
      TANK_HEIGHT,
      TANK_WIDTH
    );
    this.randTanks = generateRandTanks(ctx, enemiesCount, enemiesSpeed);
    this.bullets = [];

    // Bind the gameLoop method to the Game class
    // just weird JS behavior, alternative is line 26: requestAnimationFrame(() => this.gameLoop());
    // this.gameLoop = this.gameLoop.bind(this);
  }

  gameLoop() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (const tank of this.randTanks) {
      console.log(tank);
      tank.move();
      tank.draw();
    }
    this.mainTank.draw();
    if (rightPressed) {
      this.mainTank.move('right');
    } else if (leftPressed) {
      this.mainTank.move('left');
    } else if (upPressed) {
      this.mainTank.move('up');
    } else if (downPressed) {
      this.mainTank.move('down');
      this.mainTank.shoot();
    }

    const bullet = new Bullet(this.ctx, 10, 10, 'up', 0.5);
    bullet.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}

// handle user input
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

function handleKeyDown(event) {
  switch (event.code) {
    case 'ArrowRight':
      rightPressed = true;
      break;
    case 'ArrowLeft':
      leftPressed = true;
      break;
    case 'ArrowUp':
      upPressed = true;
      break;
    case 'ArrowDown':
      downPressed = true;
      break;
  }
}

function handleKeyUp(event) {
  switch (event.code) {
    case 'ArrowRight':
      rightPressed = false;
      break;
    case 'ArrowLeft':
      leftPressed = false;
      break;
    case 'ArrowUp':
      upPressed = false;
      break;
    case 'ArrowDown':
      downPressed = false;
      break;
  }
}
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const game = new Game(CTX, 5, 0.2, 0.4);
game.gameLoop();
