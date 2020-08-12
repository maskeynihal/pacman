import gameSettings from '../utils/game.settings.js';
import {
  doesHitWall,
  isOccupiedByGhost,
  xOffset,
  yOffset,
} from '../utils/helper.js';
import gameInstance from '../globals/game.instance.js';

export default class Character {
  moveLeft() {
    if (this.canChangeDirection(gameSettings.direction.left)) {
      this.movingDirection = gameSettings.direction.left;
      return 1;
    }
    return 0;
  }

  moveRight() {
    if (this.canChangeDirection(gameSettings.direction.right)) {
      this.movingDirection = gameSettings.direction.right;
      return 1;
    }
    return 0;
  }

  moveUp() {
    if (this.canChangeDirection(gameSettings.direction.up)) {
      this.movingDirection = gameSettings.direction.up;
      return 1;
    }
    return 0;
  }

  moveDown() {
    if (this.canChangeDirection(gameSettings.direction.down)) {
      this.movingDirection = gameSettings.direction.down;
      return 1;
    }
    return 0;
  }

  hitWall(x, y) {
    if (doesHitWall(x, y)) {
      this.hitBoundry = true;
    } else {
      this.hitBoundry = false;
    }
  }

  getNearNextDirection(direction = this.movingDirection) {
    const nextPosition = {
      x: this.x,
      y: this.y,
    };
    if (direction === gameSettings.direction.left) {
      nextPosition.x = this.x - gameSettings.gridSize.width;
      nextPosition.y = this.y;
    }
    if (direction === gameSettings.direction.up) {
      nextPosition.x = this.x;
      nextPosition.y = this.y - gameSettings.gridSize.height;
    }
    if (direction === gameSettings.direction.right) {
      nextPosition.x = this.x + gameSettings.gridSize.width;
      nextPosition.y = this.y;
    }
    if (direction === gameSettings.direction.down) {
      nextPosition.x = this.x;
      nextPosition.y = this.y + gameSettings.gridSize.height;
    }
    return nextPosition;
  }

  canChangeDirection(direction) {
    const nextPosition = this.getNearNextDirection(direction);
    return (
      !doesHitWall(nextPosition.x, nextPosition.y) &&
      !isOccupiedByGhost(nextPosition, this.ghostColor)
    );
  }

  /**
   * draw character with rotation
   */
  drawCharacter(
    image,
    x,
    y,
    sourceX,
    sourceY,
    width,
    height,
    rotationDegree,
    headName
  ) {
    // display player number in head
    gameInstance.context.fillText(headName, x, y);

    // rotation
    gameInstance.context.save();
    gameInstance.context.translate(x, y);
    gameInstance.context.rotate(rotationDegree);
    // draw image
    gameInstance.context.drawImage(
      image,
      sourceX,
      sourceY,
      width,
      height,
      xOffset(rotationDegree),
      yOffset(rotationDegree),
      width,
      height
    );
    gameInstance.context.restore();
  }
}
