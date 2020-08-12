import gameInstance from '../globals/game.instance.js';
import gameSettings from '../utils/game.settings.js';
import { getRandomNumber, getIndex } from '../utils/helper.js';

export default class SpeedCherry {
  constructor() {
    this.image;
    this.canHaveSpeedCherry = true;
    this.intervalTime = 5000;
    this.x = 0;
    this.y = 0;
    this.build();
  }

  setupGameMode() {
    this.resetPosition();
    const currentGameLevel = gameInstance.currentGameMode.level;
    const { canHaveSpeedCherry, timeInterval } = gameSettings.speedCherry[
      currentGameLevel
    ];
    this.setCanHaveSpeedCherry(canHaveSpeedCherry);
    this.setIntervalTime(timeInterval);
    this.setupInterval();
  }

  resetPosition(column = 0, row = 0) {
    gameInstance.currentPosition.powers.speedCherry = getIndex(column, row);
  }

  setCanHaveSpeedCherry(canHave) {
    this.canHaveSpeedCherry = canHave;
  }

  setIntervalTime(time) {
    this.intervalTime = time;
  }

  build() {
    this.loadImage();
  }

  loadImage() {
    this.image = new Image();
    this.image.src = gameSettings.speedCherry.image;
  }

  draw() {
    const { x, y } = this.getPosition();
    if (x !== 0 && y !== 0) {
      gameInstance.context.drawImage(this.image, x, y);
    }
  }

  changePosition() {
    const randomNumber = getRandomNumber(0, gameSettings.targetNode.length - 1);
    const { column, row } = gameSettings.targetNode[randomNumber];
    gameInstance.currentPosition.powers.speedCherry = getIndex(column, row);
    return gameInstance.currentPosition.powers.speedCherry;
  }

  getPosition() {
    return gameInstance.currentPosition.powers.speedCherry;
  }

  setupInterval() {
    if (!gameInstance.speedCherryIntervalId) {
      clearInterval(gameInstance.speedCherryIntervalId);
    }

    const intervalId = setInterval(() => {
      if (
        gameInstance.gameStatus.currentGameStatus ===
          gameInstance.gameStatus.playing &&
        this.canHaveSpeedCherry &&
        gameInstance.frames > 120
      ) {
        this.changePosition();
      }
    }, this.intervalTime);

    gameInstance.intervalId.push(intervalId);
  }
}
