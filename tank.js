TANK_HEIGHT = 20;
TANK_WIDTH = 20;
CANNON_HEIGHT = 5.5;
CANNON_WIDTH = 5.5;

class Tank {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color || 'red';
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
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

ctx = document.getElementById('canvas').getContext('2d');
tank = new Tank(10, 10);
tank.draw(ctx);
