import { rand, randColor, randInt } from './utils/rand.js';

const TANK_HEIGHT = 20;
const TANK_WIDTH = 20;
const CANNON_HEIGHT = TANK_HEIGHT / 3.6;
const CANNON_WIDTH = TANK_WIDTH / 3.6;
const BULLET_SIZE = TANK_HEIGHT / 4;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

class Bullet {
  constructor(x, y, direction, speed) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, BULLET_SIZE, BULLET_SIZE);
  }

  move() {
    switch (this.direction) {
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
        console.error(`${this.direction} is incorrect.`);
    }
  }
}

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
    this.drawTank();
    ctx.resetTransform();
  }

  drawTank() {
    // tank body
    ctx.fillRect(this.x, this.y, TANK_WIDTH, TANK_HEIGHT);

    // tank cannon
    ctx.fillRect(
      this.x + TANK_WIDTH / 2 - CANNON_WIDTH / 2,
      this.y - CANNON_HEIGHT,
      CANNON_WIDTH,
      CANNON_HEIGHT
    );
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

  shoot() {
    const bullet = new Bullet(
      this.x + TANK_WIDTH / 2 - BULLET_SIZE / 2,
      this.y + TANK_HEIGHT + CANNON_HEIGHT,
      this.direction,
      0.5
    );
    bullet.draw();
  }
}

function generateRandTanks(n, speed) {
  const randTanks = [];
  for (let i = 0; i < n; i++) {
    const tank = new Tank(
      rand(TANK_WIDTH / 2, CANVAS_WIDTH - (3 * TANK_WIDTH) / 2),
      rand(TANK_HEIGHT / 2, CANVAS_HEIGHT - (3 * TANK_HEIGHT) / 2),
      ['up', 'right', 'left', 'down'][randInt(0, 4)],
      randColor(),
      speed
    );
    randTanks.push(tank);
  }
  return randTanks;
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

function game(enemiesCount, enemiesSpeed, userSpeed) {
  const mainTank = new Tank(
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT - (3 / 2) * TANK_HEIGHT,
    'down',
    'white',
    userSpeed
  );
  const randTanks = generateRandTanks(enemiesCount, enemiesSpeed);

  function gameLoop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (const tank of randTanks) {
      tank.move();
      tank.draw();
    }
    mainTank.draw();
    if (rightPressed) {
      mainTank.move('right');
    } else if (leftPressed) {
      mainTank.move('left');
    } else if (upPressed) {
      mainTank.move('up');
    } else if (downPressed) {
      mainTank.move('down');
      mainTank.shoot();
    }

    const bullet = new Bullet(10, 10, 'up', 0.5);
    bullet.draw();

    requestAnimationFrame(gameLoop);
  }
  // each frame every element in the canvas needs to be redrawn
  // This are all the elements: bullets, tanks, walls,
  // also, in each frame collisions need to be checked
  // and the game state needs to be updated:
  // - Remove a tank if it is hit by a bullet
  // - Remove a bullet if it hits a wall
  // - score?

  gameLoop();
}

game(5, 0.4, 0.4);
