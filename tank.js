import { Bullet, Tank } from './models.js';
import { rand, randColor, randInt } from './utils/rand.js';

const TANK_HEIGHT = 20;
const TANK_WIDTH = 20;

const CANVAS = document.querySelector('canvas');
const CTX = CANVAS.getContext('2d');

const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;

function generateRandTanks(n, speed) {
  const randTanks = [];
  for (let i = 0; i < n; i++) {
    const tank = new Tank(
      CTX,
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
    CTX,
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT - (3 / 2) * TANK_HEIGHT,
    'down',
    'white',
    userSpeed,
    TANK_HEIGHT,
    TANK_WIDTH
  );
  const randTanks = generateRandTanks(enemiesCount, enemiesSpeed);

  function gameLoop() {
    CTX.fillStyle = 'rgba(0, 0, 0, 0.25)';
    CTX.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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

    const bullet = new Bullet(CTX, 10, 10, 'up', 0.5);
    bullet.draw();

    /*
    handleUserInput(tank); // update tank position based on user input
    draw tanks (input is handled somewhere else? maybe another function)
    draw bullets 
     */

    requestAnimationFrame(gameLoop);
  }
  // define game initial state
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
