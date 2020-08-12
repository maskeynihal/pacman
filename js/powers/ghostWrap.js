import gameSettings from '../utils/game.settings.js';
import gameInstance from '../globals/game.instance.js';
import { getRandomNumber, getIndex } from '../utils/helper.js';

export default class GhostWrap {
  constructor() {
    this.image;
    this.canTrap = true;
    this.intervalTime = 5000;
    this.x = 0;
    this.y = 0;
    this.build();
  }

  setupGameMode() {
    this.resetPosition();
    const currentGameLevel = gameInstance.currentGameMode.level;
    const { canTrap, timeInterval } = gameSettings.ghostWrap[currentGameLevel];
    this.setCanTrap(canTrap);
    this.setIntervalTime(timeInterval);
    this.setupInterval();
  }

  resetPosition(column = 0, row = 0) {
    gameInstance.currentPosition.powers.ghostWrap = getIndex(column, row);
  }

  setCanTrap(canTrap) {
    this.canTrap = canTrap;
  }

  setIntervalTime(time) {
    this.intervalTime = time;
  }

  build() {
    this.loadImage();
  }

  loadImage() {
    this.image = new Image();
    this.image.src = gameSettings.ghostWrap.image;
  }

  draw() {
    const { x, y } = this.getPosition();
    if (x !== 0 && y !== 0) {
      gameInstance.context.drawImage(this.image, x, y);
    }
  }

  changePosition() {
    // chooses randomghost
    const randomGhost =
      gameInstance.ghosts[getRandomNumber(0, gameInstance.ghosts.length - 1)];
    // chooses random node from shortest path nodes of the random ghost
    const randomNode =
      randomGhost.shortestPath[
        getRandomNumber(0, randomGhost.shortestPath.length - 1)
      ];
    const { column, row } = randomNode;
    gameInstance.currentPosition.powers.ghostWrap = getIndex(column, row);
    return gameInstance.currentPosition.powers.ghostWrap;
  }

  getPosition() {
    return gameInstance.currentPosition.powers.ghostWrap;
  }

  setupInterval() {
    if (!gameInstance.ghostWrapIntervalId) {
      clearInterval(gameInstance.ghostWrapIntervalId);
    }
    const intervalId = setInterval(() => {
      if (
        gameInstance.gameStatus.currentGameStatus ===
          gameInstance.gameStatus.playing &&
        this.canTrap &&
        gameInstance.frames > 120
      ) {
        this.changePosition();
      }
    }, this.intervalTime);

    gameInstance.intervalId.push(intervalId);
  }
}
