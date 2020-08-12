import gameInstance from '../globals/game.instance.js';
import gameSettings from '../utils/game.settings.js';
import {
  getTileIndex,
  getTileType,
  getColumn,
  getRow,
  getIndex,
} from '../utils/helper.js';
import { pacmanSprite } from '../utils/sprites.js';
import Character from './character.js';
import sound from '../sounds/sound.js';

export default class Pacman extends Character {
  constructor(playerNumber) {
    super();
    this.playerNumber = `player${playerNumber}`;
    this.x = 0;
    this.y = 0;
    this.image = null;
    this.score = 0;
    this.lives = 0;
    this.gameOverFlag = false;
    this.lifeLostFlag = false;
    this.setPacmanLives();
    this.init();
    this.isFreeze = false;
    this.rotationDegree = [0, -180, -90, 0, 90, 0];
  }

  setPacmanLives() {
    const currentMode = gameInstance.currentGameMode.mode;
    this.lives = gameSettings.setupGameAsPerLevel[currentMode].lives;
  }

  // reset lives and position to restart game
  restartGame() {
    this.lives = gameSettings.lives;
    this.score = 0;
    this.init();
  }

  resetSpeed() {
    this.speed = gameSettings.pacman[this.playerNumber].speed;
  }

  // initialize every data and load pacman
  init() {
    this.animationIndex = 0;
    this.movingDirection = gameSettings.direction.noMovement;
    this.hitBoundry = false;
    this.initializePosition();
    this.loadPacman();
    this.lifeLostFlag = false;
    this.gameOverFlag = false;
    this.resetSpeed();
  }

  loadPacman() {
    this.image = new Image();
    this.image.src = gameSettings.pacman.image;
    this.image.addEventListener('load', () => {
      this.draw();
    });
  }

  initializePosition() {
    const { startColumn, startRow } = gameSettings.pacman[this.playerNumber];
    const { x, y } = getIndex(startColumn, startRow);

    this.x = x;
    this.y = y;

    gameInstance.currentPosition.pacmans[
      this.playerNumber
    ] = this.getPosition();
  }

  draw() {
    const currentPacman = pacmanSprite.animation[this.animationIndex];
    gameInstance.context.drawImage(
      this.image,
      currentPacman.sourceX,
      currentPacman.sourceY,
      gameSettings.gridSize.width,
      gameSettings.gridSize.height,
      this.x,
      this.y,
      gameSettings.gridSize.width,
      gameSettings.gridSize.height
    );
  }

  // set position of pacman
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  // returns current position of pacman
  getPosition() {
    return {
      x: this.x,
      y: this.y,
      column: getColumn(this.x),
      row: getRow(this.y),
    };
  }

  nextPositionUpdate(x, y) {
    const column = getColumn(x);
    const row = getRow(y);
    const tileType = getTileType(column, row);
    const tileIndex = getTileIndex(column, row);
    // todo refactor
    // eat small dot and increase score by 1
    if (gameInstance.tiles.layers[0].data[tileIndex] === 17) {
      this.score += 1;
      sound.munch.play();
      gameInstance.tiles.layers[0].data[tileIndex] = 0;
      gameInstance.totalDotsRemaining -= 1;
    }
    // todo refactor
    // eat big dot and increase score by 10
    if (gameInstance.tiles.layers[0].data[tileIndex] === 18) {
      if (
        gameInstance.gameLevelStatus.currentGameStatus !==
        gameInstance.gameLevelStatus.singlePlayer.extreme
      ) {
        gameInstance.eatBigDot += 300;
      }
      this.score += 10;
      sound.eatBigDot.play();
      gameInstance.tiles.layers[0].data[tileIndex] = 0;
      gameInstance.totalDotsRemaining -= 1;
    }
    this.hitWall(x, y);
  }

  update(x = this.x, y = this.y) {
    sound.pacmanDeath.stop();
    const currentPacman = this.getPacmanAnimation();
    if (!this.isFreeze) {
      if (gameInstance.frames % this.getSpeed() < 1) {
        // checks if pacman is contacted with ghost. that means life is lost
        // const lifeLost = this.contactWithGhost();
        const eatSpeedCherry = this.eatSpeedCherry();
        const nextPosition = this.getNearNextDirection();

        this.nextPositionUpdate(nextPosition.x, nextPosition.y);

        if (!this.hitBoundry) {
          this.setPosition(nextPosition.x, nextPosition.y);
        }
      }
    } else {
      const nextPosition = getIndex(
        gameSettings.pacman[this.playerNumber].freezeColumn,
        gameSettings.pacman[this.playerNumber].freezeRow
      );
      this.setPosition(nextPosition.x, nextPosition.y);

      this.contactWithPacman(this);
    }

    gameInstance.context.fillStyle = 'rgba(255, 255,255, 1)';
    gameInstance.context.font = '15px Arial';

    // draw character
    this.drawCharacter(
      this.image,
      this.x,
      this.y,
      currentPacman.sourceX,
      currentPacman.sourceY,
      gameSettings.gridSize.width,
      gameSettings.gridSize.height,
      this.rotation(),
      this.playerNumber
    );
  }

  getPacmanAnimation() {
    if (this.hitBoundry) {
      return pacmanSprite.animation[3];
    }

    if (this.isFreeze) {
      this.animationIndex = 5;
    } else {
      this.animationIndex +=
        gameInstance.frames %
          gameSettings.pacman[this.playerNumber].animationSpeed ===
        0
          ? 1
          : 0;
      this.animationIndex %= pacmanSprite.animation.length - 1;
    }
    return pacmanSprite.animation[this.animationIndex];
  }

  gameOver() {
    // when life is 0, gameover flag is raised
    this.gameOverFlag = true;
  }

  /**
   * Decrease life when contact with host and call init function that reset pacman position
   * */
  lifeLost() {
    if (gameInstance.currentGameMode.mode === 'multi') {
      this.isFreeze = true;
    }
    this.lives -= 1;
    this.lifeLostFlag = true;
  }

  resetLifeLostFlag() {}

  contactWithPacman(self) {
    for (let index = 0; index < gameInstance.pacmans.length; index += 1) {
      if (
        gameInstance.pacmans[index] !== self &&
        JSON.stringify(gameInstance.pacmans[index].getPosition()) ===
          JSON.stringify(self.getPosition())
      ) {
        self.isFreeze = false;
        gameInstance.pacmans[index].isFreeze = false;
        this.gameOverFlag = false;
        this.lifeLostFlag = false;
        this.lives = 1;
      }
    }
    return false;
  }

  eatSpeedCherry() {
    const { x, y } = gameInstance.currentPosition.powers.speedCherry;
    if (this.x === x && this.y === y) {
      gameInstance.currentPosition.powers.speedCherry.x = 0;
      gameInstance.currentPosition.powers.speedCherry.y = 0;
      sound.speedCherry.play();
      this.setSpeed();
    } else {
      sound.speedCherry.stop();
    }
  }

  setSpeed() {
    this.speed = gameSettings.pacman.increasedSpeed;
    const currentGameLevel = gameInstance.currentGameMode.level;
    const { timeOut } = gameSettings.speedCherry[currentGameLevel];
    setTimeout(() => {
      this.resetSpeed();
    }, timeOut);
  }

  getSpeed() {
    return this.speed;
  }

  rotation() {
    return (this.rotationDegree[this.movingDirection] * Math.PI) / 180;
  }
}
