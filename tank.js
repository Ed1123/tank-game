import { rand, randColor, randInt } from './utils/rand.js';

const TANK_HEIGHT = 20;
const TANK_WIDTH = 20;
const CANNON_HEIGHT = 5.5;
const CANNON_WIDTH = 5.5;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

class Tank {
  constructor(x, y, direction, color, speed) {
    this.x = x;
    this.y = y;
    this.color = color || 'red';
    this.direction = direction || 'up';
    this.speed = speed || 0.4;
  }

  draw() {
    ctx.fillStyle = this.color;

    // Turn the tank
    let [centerX, centerY] = [
      this.x + TANK_WIDTH / 2,
      this.y + TANK_HEIGHT / 2,
    ];
    ctx.translate(centerX, centerY);
    switch (this.direction) {
      case 'up':
        break;
      case 'right':
        ctx.rotate(Math.PI / 2);
        break;
      case 'left':
        ctx.rotate(-Math.PI / 2);
        break;
      case 'down':
        ctx.rotate(Math.PI);
        break;
      default:
        console.error(`${this.direction} is incorrect.`);
    }
    ctx.translate(-centerX, -centerY);

    // tank body
    ctx.fillRect(this.x, this.y, TANK_WIDTH, TANK_HEIGHT);

    // tank cannon
    ctx.fillRect(
      this.x + TANK_WIDTH / 2 - CANNON_WIDTH / 2,
      this.y - CANNON_HEIGHT,
      CANNON_WIDTH,
      CANNON_HEIGHT
    );

    // reset context for next drawings
    ctx.resetTransform();
  }

  move(direction) {
    this.direction = direction;
    switch (direction) {
      case 'up':
        this.y -= this.speed;
        break;
      case 'right':
        this.x += this.speed;
        break;
      case 'left':
        this.x -= this.speed;
        break;
      case 'down':
        this.y += this.speed;
        break;
      default:
        console.error(`${direction} is incorrect.`);
    }
  }
}
function generateRandTanks(n) {
  const randTanks = [];
  for (let i = 0; i < n; i++) {
    const tank = new Tank(
      rand(TANK_WIDTH / 2, CANVAS_WIDTH - (3 * TANK_WIDTH) / 2),
      rand(TANK_HEIGHT / 2, CANVAS_HEIGHT - (3 * TANK_HEIGHT) / 2),
      ['up', 'right', 'left', 'down'][randInt(0, 4)],
      randColor()
    );
    randTanks.push(tank);
  }
  return randTanks;
}

const randTanks = generateRandTanks(4);
const tank = new Tank(
  CANVAS_WIDTH / 2,
  CANVAS_HEIGHT - (3 / 2) * TANK_HEIGHT,
  'down',
  'white'
);

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

function game() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  tank.draw();
  for (const tank of randTanks) {
    tank.move();
    tank.draw();
  }
  if (rightPressed) {
    tank.move('right');
  } else if (leftPressed) {
    tank.move('left');
  } else if (upPressed) {
    tank.move('up');
  } else if (downPressed) {
    tank.move('down');
  }

  requestAnimationFrame(game);
}
game();
