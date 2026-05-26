export const powers = [
  {
    name: 'Double Shot',
    apply(player) {
      player.multiShot += 1;
    }
  },

  {
    name: 'Damage Boost',
    apply(player) {
      player.damage += 10;
    }
  },

  {
    name: 'Attack Speed',
    apply(player) {
      player.fireRate -= 100;

      if (player.fireRate < 100) {
        player.fireRate = 100;
      }
    }
  },

  {
    name: 'Speed Boost',
    apply(player) {
      player.speed += 1;
    }
  }
];