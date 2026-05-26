import { Player } from './player.js';
import { Zombie } from './zombie.js';
import { Bullet } from './bullet.js';
import { Boss } from './boss.js';
import { powers } from './powerup.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width / 2, canvas.height / 2);

const keys = {};

const bullets = [];
const zombies = [];

let boss = null;

let level = 1;
let kills = 0;

let zombieSpawn = 0;

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function spawnZombie() {
  const side = Math.floor(Math.random() * 4);

  let x;
  let y;

  if (side === 0) {
    x = 0;
    y = Math.random() * canvas.height;
  }

  if (side === 1) {
    x = canvas.width;
    y = Math.random() * canvas.height;
  }

  if (side === 2) {
    x = Math.random() * canvas.width;
    y = 0;
  }

  if (side === 3) {
    x = Math.random() * canvas.width;
    y = canvas.height;
  }

  zombies.push(new Zombie(x, y, level));
}

function autoShoot() {
  const now = Date.now();

  if (now - player.lastShot < player.fireRate) return;

  if (zombies.length === 0 && !boss) return;

  player.lastShot = now;

  let target;

  if (boss) {
    target = boss;
  } else {
    target = zombies[0];
  }

  const angle = Math.atan2(
    target.y - player.y,
    target.x - player.x
  );

  for (let i = 0; i < player.multiShot; i++) {
    const spread =
      (i - (player.multiShot - 1) / 2) * 0.2;

    bullets.push(
      new Bullet(
        player.x,
        player.y,
        angle + spread,
        player.damage
      )
    );
  }
}

function updateBullets() {
  bullets.forEach((bullet, bulletIndex) => {
    bullet.update();

    zombies.forEach((zombie, zombieIndex) => {
      const dx = bullet.x - zombie.x;
      const dy = bullet.y - zombie.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bullet.radius + zombie.radius) {

        zombie.hp -= bullet.damage;

        bullets.splice(bulletIndex, 1);

        if (zombie.hp <= 0) {

          zombies.splice(zombieIndex, 1);

          kills++;

          document.getElementById('kills').innerText = kills;

          if (kills % 10 === 0) {
            levelUp();
          }
        }
      }
    });

    if (boss) {

      const dx = bullet.x - boss.x;
      const dy = bullet.y - boss.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bullet.radius + boss.radius) {

        boss.hp -= bullet.damage;

        bullets.splice(bulletIndex, 1);

        if (boss.hp <= 0) {
          alert('YOU WIN!');
          location.reload();
        }
      }
    }
  });
}

function updateZombies() {
  zombies.forEach((zombie) => {

    zombie.update(player);

    const dx = player.x - zombie.x;
    const dy = player.y - zombie.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.radius + zombie.radius) {

      player.hp -= 0.5;

      document.getElementById('hp').innerText =
        Math.floor(player.hp);

      if (player.hp <= 0) {
        alert('GAME OVER');
        location.reload();
      }
    }
  });
}

function updateBoss() {
  if (!boss) return;

  boss.update(player);

  const dx = player.x - boss.x;
  const dy = player.y - boss.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < player.radius + boss.radius) {

    player.hp -= 0.3;

    document.getElementById('hp').innerText =
      Math.floor(player.hp);

    if (player.hp <= 0) {
      alert('GAME OVER');
      location.reload();
    }
  }
}

function levelUp() {

  level++;

  document.getElementById('level').innerText = level;

  if (level <= 5) {

    const randomPower =
      powers[Math.floor(Math.random() * powers.length)];

    randomPower.apply(player);

    alert(
      `Level ${level}\nPower Gained: ${randomPower.name}`
    );
  }

  if (level === 5) {

    setTimeout(() => {
      boss = new Boss(
        canvas.width / 2,
        100
      );
    }, 3000);
  }
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);

  bullets.forEach((bullet) => {
    bullet.draw(ctx);
  });

  zombies.forEach((zombie) => {
    zombie.draw(ctx);
  });

  if (boss) {
    boss.draw(ctx);
  }
}

function gameLoop() {

  requestAnimationFrame(gameLoop);

  player.move(keys, canvas);

  autoShoot();

  updateBullets();

  updateZombies();

  updateBoss();

  draw();

  zombieSpawn++;

  if (zombieSpawn > 60 && level < 5) {

    spawnZombie();

    zombieSpawn = 0;
  }
}

gameLoop();
