import gameInstance from './globals/game.instance.js';

export default class ScoreBoard {
  update() {
    gameInstance.pacmans.forEach((pacman, index) => {
      gameInstance.context.font = '14px Arial';
      gameInstance.context.fillText(
        pacman.playerNumber.toUpperCase(),
        5 + index * 210,
        20
      );
      gameInstance.context.fillText(
        `Score: ${pacman.score}`,
        5 + index * 210,
        40
      );
      gameInstance.context.fillText(
        `Lives: ${pacman.lives}`,
        5 + index * 210,
        60
      );
    });
  }
}
