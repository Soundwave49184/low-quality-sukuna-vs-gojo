export class Boss {

  constructor(x, y) {

    this.x = x;
    this.y = y;

    // BIGGER BOSS
    this.radius = 80;

    this.speed = 1.5;

    this.maxHp = 1500;
    this.hp = this.maxHp;

    this.damage = 25;

    // BOSS IMAGE
    this.image = new Image();
    this.image.src = './assets/boss.png';
  }

  update(player) {

    const angle = Math.atan2(
      player.y - this.y,
      player.x - this.x
    );

    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
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

    // BOSS HP BAR
    ctx.fillStyle = 'red';
    ctx.fillRect(200, 20, 400, 20);

    ctx.fillStyle = 'lime';

    ctx.fillRect(
      200,
      20,
      (this.hp / this.maxHp) * 400,
      20
    );
  }
}
