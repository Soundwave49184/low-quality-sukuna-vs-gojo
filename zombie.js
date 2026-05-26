export class Zombie {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;

    this.radius = 30;

    this.speed = 1 + level * 0.2;

    this.maxHp = 40 + level * 30;
    this.hp = this.maxHp;

    this.damage = 40;
  }

  update(player) {
    const angle = Math.atan2(player.y - this.y, player.x - this.x);

    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
  }

    draw(ctx) {

    if (!this.image) {
        this.image = new Image();
        this.image.src = './assets/zombie.png';
    }

    ctx.drawImage(
        this.image,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
    );

    // HP BAR
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x - 20, this.y - 30, 40, 5);

    ctx.fillStyle = 'lime';
    ctx.fillRect(
        this.x - 20,
        this.y - 30,
        (this.hp / this.maxHp) * 40,
        5
    );
    }
}
