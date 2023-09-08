TANK_HEIGHT = 20;
TANK_WIDTH = 20;
CANNON_HEIGHT = 5.5;
CANNON_WIDTH = 5.5;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

class Tank {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color || 'red';
  }

  draw() {
    ctx.fillStyle = this.color;

    // Turn the tank. TODO: REFACTOR
    let [centerX, centerY] = [
      this.x + TANK_WIDTH / 2,
      this.y + TANK_HEIGHT / 2,
    ];
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.PI / 2);
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
  }
}

tank = new Tank(10, 10);
tank.draw();
