export class Bullet {
  constructor(ctx, x, y, direction, speed, size) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.size = size || 5;
  }

  draw() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
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

export class Tank {
  constructor(ctx, x, y, direction, color, speed, height, width) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color || 'red';
    this.direction = direction || 'up';
    this.speed = speed || 0.4;

    this.height = height;
    this.width = width;
    this.cannonHeight = height / 3.6;
    this.cannonWidth = width / 3.6;
    this.bulletSize = height / 4;
  }

  draw() {
    this.ctx.fillStyle = this.color;

    // Turn the tank
    let [centerX, centerY] = [
      this.x + this.width / 2,
      this.y + this.height / 2,
    ];
    this.ctx.translate(centerX, centerY);
    switch (this.direction) {
      case 'up':
        break;
      case 'right':
        this.ctx.rotate(Math.PI / 2);
        break;
      case 'left':
        this.ctx.rotate(-Math.PI / 2);
        break;
      case 'down':
        this.ctx.rotate(Math.PI);
        break;
      default:
        console.error(`${this.direction} is incorrect.`);
    }
    this.ctx.translate(-centerX, -centerY);
    this.drawTank();
    this.ctx.resetTransform();
  }

  drawTank() {
    // tank body
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    // tank cannon
    this.ctx.fillRect(
      this.x + this.width / 2 - this.cannonWidth / 2,
      this.y - this.cannonHeight,
      this.cannonWidth,
      this.cannonHeight
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
        console.error(`${this.direction} is incorrect.`);
    }
  }

  shoot() {
    console.log('shoot');
    console.log(this.direction);
    let bullet;
    switch (this.direction) {
      case 'up':
        bullet = new Bullet(
          this.ctx,
          this.x + this.width / 2 - this.bulletSize / 2,
          this.y - this.bulletSize - this.cannonHeight,
          this.direction,
          this.speed
        );
        break;
      case 'right':
        bullet = new Bullet(
          this.ctx,
          this.x + this.cannonHeight + this.width,
          this.y + this.width / 2 - this.bulletSize / 2,
          this.direction,
          this.speed
        );
        break;
      case 'left':
        bullet = new Bullet(
          this.ctx,
          this.x - this.bulletSize - this.cannonHeight,
          this.y + this.width / 2 - this.bulletSize / 2,
          this.direction,
          this.speed
        );
        break;
      case 'down':
        bullet = new Bullet(
          this.ctx,
          this.x + this.width / 2 - this.bulletSize / 2,
          this.y + this.height + this.cannonHeight,
          this.direction,
          this.speed
        );
        break;
      default:
        console.error(`${this.direction} is incorrect.`);
    }
    return bullet;
  }
}
