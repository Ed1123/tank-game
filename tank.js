TANK_HEIGHT = 20;
TANK_WIDTH = 20;
CANNON_HEIGHT = 5.5;
CANNON_WIDTH = 5.5;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

class Tank {
  constructor(x, y, direction, color) {
    this.x = x;
    this.y = y;
    this.color = color || 'red';
    this.direction = direction || 'up';
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
        ctx.rotate((3 * Math.PI) / 2);
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
}

function rand(from, to) {
  return Math.random() * (to - from) + from;
}

function randInt(from, to) {
  return Math.floor(rand(from, to));
}

function randColor() {
  return `rgb(${randInt(0, 256)}, ${randInt(0, 256)}, ${randInt(0, 256)})`;
}

for (let i = 0; i < 5; i++) {
  tank = new Tank(
    rand(TANK_WIDTH / 2, CANVAS_WIDTH - TANK_WIDTH / 2),
    rand(TANK_HEIGHT / 2, CANVAS_HEIGHT - TANK_HEIGHT / 2),
    ['up', 'right', 'left', 'down'][randInt(0, 4)],
    randColor()
  );
  tank.draw();
}
