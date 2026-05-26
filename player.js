export class Player {

  constructor(x, y) {

    this.x = x;
    this.y = y;

    // BIGGER PLAYER
    this.radius = 35;

    this.speed = 5;

    this.hp = 100;

    this.dx = 0;
    this.dy = 0;

    this.damage = 20;

    this.fireRate = 500;

    this.lastShot = 0;

    this.multiShot = 1;

    // PLAYER IMAGE
    this.image = new Image();
    this.image.src = './assets/player.png';
  }

  move(keys, canvas) {

    this.dx = 0;
    this.dy = 0;

    if (keys['w']) this.dy = -this.speed;
    if (keys['s']) this.dy = this.speed;
    if (keys['a']) this.dx = -this.speed;
    if (keys['d']) this.dx = this.speed;

    this.x += this.dx;
    this.y += this.dy;

    // SCREEN LIMIT
    if (this.x < this.radius) {
      this.x = this.radius;
    }

    if (this.x > canvas.width - this.radius) {
      this.x = canvas.width - this.radius;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
    }

    if (this.y > canvas.height - this.radius) {
      this.y = canvas.height - this.radius;
    }
  }

  draw(ctx) {

    ctx.save();

    ctx.drawImage(
      this.image,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );

    ctx.restore();
  }
}
