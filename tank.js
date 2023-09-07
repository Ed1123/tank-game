class Tank {
  constructor(x, y, width, height, color, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color || 'red';
    this.speed = speed || 5;
    this.direction = 'right';
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

ctx = document.getElementById('canvas').getContext('2d');
tank = new Tank(0, 0, 20, 20, 'red', 5);
tank.draw(ctx);
