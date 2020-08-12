import gameSettings from './game.settings.js';
import gameInstance from '../globals/game.instance.js';
import sound from '../sounds/sound.js';

/**
 * Gets Tile index for given row and column
 *  @param {integer} column - column index of grid
 * @param {integer} row - row index of grid
 */

const getTileIndex = (column, row) => row * gameInstance.tiles.width + column;

const getTileType = (column, row) =>
  gameInstance.tiles.layers[0].data[getTileIndex(column, row)];

// get grid column from real x
const getColumn = (x) => x / gameSettings.gridSize.width;

// get grid row from real y
const getRow = (y) => y / gameSettings.gridSize.height;

/**
 * Draws Tile Image on grid
 * @param {CanvasRenderingContext2D} context
 * @param {Image} Image
 * @param {integer} tileIndex - index in which the tile is in the image
 * @param {integer} x - target x where the tile should be rendered
 * @param {integer} y - target y where the tile should be rendered
 */

const drawTileImage = (context, image, tileType, x, y) => {
  const tileWidth = gameInstance.tiles.tilewidth;
  const tileHeight = gameInstance.tiles.tilewidth;
  // as tile sprite doesnt have empty tile
  const sourceX = (tileType - 1) * tileWidth;
  const sourceY = 0;
  const targetX = x;
  const targetY = y;
  const targetWidth = tileWidth;
  const targetHeight = tileHeight;
  // if tile type is zero that means the grid is empty
  if (tileType !== 0) {
    context.drawImage(
      image,
      sourceX,
      sourceY,
      tileWidth,
      tileHeight,
      targetX,
      targetY,
      targetWidth,
      targetHeight
    );
  }
};

const getIndex = (column, row) => {
  const x = column * gameSettings.gridSize.width;
  const y = row * gameSettings.gridSize.height;
  return { x, y, column, row };
};

/**
 * Return next position of pacman
 */
const getNextPosition = (pacman) => {
  const nextPosition = {
    x: pacman.x,
    y: pacman.y,
  };
  if (pacman.movingDirection === gameSettings.direction.left) {
    nextPosition.x = pacman.x - gameSettings.gridSize.width;
    nextPosition.y = pacman.y;
  }
  if (pacman.movingDirection === gameSettings.direction.up) {
    nextPosition.x = pacman.x;
    nextPosition.y = pacman.y - gameSettings.gridSize.height;
  }
  if (pacman.movingDirection === gameSettings.direction.right) {
    nextPosition.x = pacman.x + gameSettings.gridSize.width;
    nextPosition.y = pacman.y;
  }
  if (pacman.movingDirection === gameSettings.direction.down) {
    nextPosition.x = pacman.x;
    nextPosition.y = pacman.y + gameSettings.gridSize.height;
  }
  return nextPosition;
};

// real x and y
const doesHitWall = (x, y) => {
  const column = getColumn(x);
  const row = getRow(y);
  const tileType = getTileType(column, row);
  return tileType !== 0 && tileType !== 17 && tileType !== 18;
};

const getRandomNumber = (min = 1, max = 999) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

const getDistance = (node1, node2) =>
  Math.sqrt((node1.column - node2.column) ** 2 + (node1.row - node2.row) ** 2);

const hasGhost = (currentGhost, node) => {
  const distance = getDistance(node, currentGhost);
  return distance < 1;
};

const isOccupiedByGhost = (node, ghostColor) => {
  const objectKeys = Object.keys(gameInstance.currentPosition.ghosts);
  for (let index = 0; index < objectKeys.length; index += 1) {
    if (ghostColor !== objectKeys[index]) {
      const currentGhost =
        gameInstance.currentPosition.ghosts[objectKeys[index]];
      if (hasGhost(currentGhost, node)) {
        return true;
      }
    }
  }

  return false;
};

const resetFrames = () => {
  gameInstance.frames = 0;
};

const clearScreen = () => {
  gameInstance.context.clearRect(
    0,
    0,
    gameSettings.canvasWidth,
    gameSettings.canvasHeight
  );
};

/**
 * changes game level according to selection
 * @param {integer} currentGameStatus
 */
const changeGameLevelStatus = (currentGameStatus) => {
  gameInstance.gameLevelStatus.currentGameStatus = currentGameStatus;
  const currentGameStatusString = currentGameStatus.toString();
  let mode = '';
  currentGameStatusString[0] === '1' ? (mode = 'single') : (mode = 'multi');
  let level = '';
  if (currentGameStatusString[1] === '1') {
    level = 'easy';
  } else if (currentGameStatusString[1] === '2') {
    level = 'medium';
  } else if (currentGameStatusString[1] === '3') {
    level = 'hard';
  } else {
    level = 'extreme';
  }

  gameInstance.currentGameMode.mode = mode;
  gameInstance.currentGameMode.level = level;
};

/**
 * change speed of character according to game level
 * @param {string} ghostColor - ghost color.
 * @param {string} gameMode - multi player or single player.
 * @param {string} gameLevel - easy, medium or hard.
 */

const changeGhostFeature = (ghostColor, gameMode, gameLevel) => {
  const { speed } = gameSettings.setupGameAsPerLevel[gameMode][
    gameLevel
  ].ghostTypes[ghostColor];

  gameSettings.ghosts.characters[ghostColor].speed = speed;
  return speed;
};

/**
 * calculate x offset
 * x offset is new value after rotation of canvas (rotation with axis)
 * sign change from real formula, because y increase as we move down, opposite of real coordinate
 * subtraction of width to make axis of rotation center
 * @param  {number} rotationDegree should be in radian
 * @param  {number} width
 * @param  {number} height
 */

const xOffset = (
  rotationDegree,
  width = gameSettings.gridSize.width / 2,
  height = gameSettings.gridSize.height / 2
) =>
  Math.round(
    width * Math.cos(rotationDegree) + height * Math.sin(rotationDegree)
  ) - width;

/**
 * calculate y offset
 * y offset is new value after rotation of canvas (rotation with axis)
 * @param  {number} rotationDegree should be in radian
 * sign change from real formula, because y increase as we move down, opposite of real coordinate
 * subtraction of height to make axis of rotation center
 * @param  {number} width
 * @param  {number} height
 */
const yOffset = (
  rotationDegree,
  width = gameSettings.gridSize.width / 2,
  height = gameSettings.gridSize.height / 2
) =>
  Math.round(
    width * Math.cos(rotationDegree) - height * Math.sin(rotationDegree)
  ) - height;

const contactWithGhost = (pacman) => {
  const keys = Object.keys(gameInstance.currentPosition.ghosts);

  for (let index = 0; index < keys.length; index += 1) {
    if (
      gameInstance.currentPosition.ghosts[keys[index]].x === pacman.x &&
      gameInstance.currentPosition.ghosts[keys[index]].y === pacman.y
    ) {
      if (gameInstance.eatBigDot > 0) {
        // eslint-disable-next-line no-param-reassign
        pacman.score += 13;
        sound.ghostDeath.play();
        gameInstance.ghosts[index].freezeFor = 10;
        gameInstance.ghosts[index].restart();
      } else {
        pacman.lifeLost();
        sound.pacmanDeath.play();
        // gameover when lives is 0
        pacman.lives <= 0 && pacman.gameOver();

        return true;
      }
    }
  }
  return false;
};

/**
 * checks if the given position is valid moving space
 * @param  {number} column
 * @param  {number} row
 */
const isAllowedSpace = (column, row) => {
  if (column < 2 || row < 3 || column > 26 || row > 33) {
    return false;
  }
  const index = getIndex(column, row);

  if (index === 0 || index === 18 || index === 17) {
    return true;
  }

  return false;
};

const getMovingDirection = (currentNode, nextNode) => {
  const changeInX = currentNode.column - nextNode.column;
  const changeInY = currentNode.row - nextNode.row;
  const concatXY = changeInX.toString() + changeInY.toString();
  switch (concatXY) {
    case '10':
      return gameSettings.direction.left;
      break;
    case '01':
      return gameSettings.direction.up;

      break;
    case '-10':
      return gameSettings.direction.right;

      break;
    case '0-1':
      return gameSettings.direction.down;

      break;
    default:
      return gameSettings.direction.noMovement;
      break;
  }
};

export {
  getTileType,
  drawTileImage,
  getTileIndex,
  getNextPosition,
  doesHitWall,
  getColumn,
  getRow,
  getIndex,
  getRandomNumber,
  getDistance,
  isOccupiedByGhost,
  resetFrames,
  clearScreen,
  changeGameLevelStatus,
  changeGhostFeature,
  xOffset,
  yOffset,
  contactWithGhost,
  isAllowedSpace,
  getMovingDirection,
};
