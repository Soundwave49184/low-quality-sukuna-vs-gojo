export class Bullet {

  constructor(x, y, angle, damage) {

    this.x = x;
    this.y = y;

    // BIGGER BULLET
    this.radius = 20;

    this.speed = 10;

    this.dx = Math.cos(angle) * this.speed;
    this.dy = Math.sin(angle) * this.speed;

    this.damage = damage;

    this.angle = angle;

    // BULLET IMAGE
    this.image = new Image();
    this.image.src = './assets/bullet.png';
  }

  update() {

    this.x += this.dx;
    this.y += this.dy;
  }

  draw(ctx) {

    ctx.save();

    ctx.translate(this.x, this.y);

    // ROTATE BULLET
    ctx.rotate(this.angle);

    // GLOW EFFECT
    ctx.shadowColor = 'yellow';
    ctx.shadowBlur = 15;

    ctx.drawImage(
      this.image,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );

    ctx.restore();
  }
}