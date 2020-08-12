import gameSettings from '../../utils/game.settings.js';
import {
  doesHitWall,
  getColumn,
  getRow,
  getRandomNumber,
  changeGhostFeature,
  getMovingDirection,
  isOccupiedByGhost,
} from '../../utils/helper.js';
import { ghosts } from '../../utils/sprites.js';
import Character from '../character.js';
import gameInstance from '../../globals/game.instance.js';

export default class Ghost extends Character {
  constructor(image, ghostColor) {
    super();
    this.image = image;
    this.ghostColor = ghostColor;
    this.animationIndex;
    this.speed = 0;
    this.movingDirection = gameSettings.direction.right;
    this.pathCounterIndex = 0;
    this.shortestPath = [];
    this.freezedFor = 0;
  }

  init() {
    this.resetSpeed();
    this.initializePosition();
    this.setAlgorithm();
  }

  initializePosition() {
    const { startColumn, startRow } = gameSettings.ghosts.characters[
      this.ghostColor
    ];
    this.x = startColumn * gameSettings.gridSize.width;
    this.y = startRow * gameSettings.gridSize.height;

    gameInstance.currentPosition.ghosts[this.ghostColor] = this.getPosition();
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y,
      column: getColumn(this.x),
      row: getRow(this.y),
    };
  }

  hitWall(x, y) {
    if (doesHitWall(x, y)) {
      this.hitBoundry = true;
      this.changeDirection();
    } else {
      this.hitBoundry = false;
    }
  }

  update() {
    const currentGhost = this.getAnimation();

    if (gameInstance.frames % this.getSpeed() < 1) {
      const nextPosition = this.getNextPosition();
      const trapOnGhostWrap = this.trapOnGhostWrap();
      this.setPosition(nextPosition);
    }

    gameInstance.context.font = '15px Arial';
    gameInstance.context.fillText(this.algorithm.algorithmName, this.x, this.y);
    gameInstance.context.drawImage(
      this.image,
      currentGhost.sourceX,
      currentGhost.sourceY,
      gameSettings.gridSize.width,
      gameSettings.gridSize.height,
      this.x,
      this.y,
      gameSettings.gridSize.width,
      gameSettings.gridSize.height
    );
  }

  changeDirection() {
    let directionChanged = false;
    while (!directionChanged) {
      const randomNumber = getRandomNumber(1, 4);
      if (randomNumber === 1) {
        directionChanged = this.moveUp();
      }
      if (randomNumber === 2) {
        directionChanged = this.moveDown();
      }
      if (randomNumber === 3) {
        directionChanged = this.moveLeft();
      }
      if (randomNumber === 4) {
        directionChanged = this.moveRight();
      }
    }

    return this.getNearNextDirection();
  }

  getNextPosition(direction = this.movingDirection) {
    this.pathCounterIndex += 1;
    if (this.pathCounterIndex < this.shortestPath.length) {
      return this.shortestPath[this.pathCounterIndex];
    }

    return this.getPosition();
  }

  setPosition(nextPosition) {
    this.movingDirection = getMovingDirection(this.getPosition(), nextPosition);
    if (
      this.movingDirection === gameSettings.direction.noMovement ||
      isOccupiedByGhost(nextPosition, this.ghostColor)
    ) {
      nextPosition = this.changeDirection();
    }
    this.x = nextPosition.x;
    this.y = nextPosition.y;
    gameInstance.currentPosition.ghosts[this.ghostColor] = this.getPosition();
    if (this.visited.length === 0) this.visited.push(nextPosition);
    let uniqueFlag = true;
    for (let index = 0; index < this.visited.length; index += 1) {
      if (
        this.visited[index].x === nextPosition.x &&
        this.visited[index].y === nextPosition.y
      ) {
        uniqueFlag = false;
        break;
      }
    }
    if (uniqueFlag) {
      this.visited.push(nextPosition);
    }
  }

  draw() {
    const currentGhost = this.getAnimation();
    gameInstance.context.drawImage(
      this.image,
      currentGhost.sourceX,
      currentGhost.sourceY,
      gameSettings.gridSize.width,
      gameSettings.gridSize.height,
      this.x,
      this.y,
      gameSettings.gridSize.width,
      gameSettings.gridSize.height
    );
  }

  getAnimation() {
    if (gameInstance.eatBigDot > 0) {
      // at last stage of completing of dot,change between color rapidly
      if (gameInstance.eatBigDot < 100 && gameInstance.eatBigDot % 13) {
        return ghosts.frightWhite.animation[this.animationIndex];
      }
      return ghosts.frightBlue.animation[this.animationIndex];
    }

    return ghosts[this.ghostColor].animation[this.animationIndex];
  }

  setAlgorithm() {}

  restart() {
    this.resetSpeed();
    this.initializePosition();
  }

  trapOnGhostWrap() {
    const { x, y } = gameInstance.currentPosition.powers.ghostWrap;
    if (this.x === x && this.y === y) {
      gameInstance.currentPosition.powers.ghostWrap.x = 0;
      gameInstance.currentPosition.powers.ghostWrap.y = 0;
      this.setSpeed();
    }
  }

  setSpeed() {
    this.speed += gameSettings.ghosts.increasedSpeed;
    const currentGameLevel = gameInstance.currentGameMode.level;
    const { timeOut } = gameSettings.ghostWrap[currentGameLevel];
    setTimeout(() => {
      this.resetSpeed();
    }, timeOut);
  }

  resetSpeed() {
    const gameMode = gameInstance.currentGameMode.mode;
    const gameLevel = gameInstance.currentGameMode.level;
    this.speed = changeGhostFeature(this.ghostColor, gameMode, gameLevel);
  }

  getSpeed() {
    return this.speed;
  }
}
