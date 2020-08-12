import gameInstance from './globals/game.instance.js';
import gameSettings from './utils/game.settings.js';
import grid from './globals/grid.js';
import { getTileType, drawTileImage, getTileIndex } from './utils/helper.js';
import Tiles from './tiles.js';

export default class Playground {
  constructor(canvasId = 'playground') {
    this.canvasId = canvasId;
    this.sprites = [];
    this.tileImage;
    this.build();
  }

  build() {
    this.tiles = new Tiles();
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = gameSettings.canvasWidth;
    this.canvas.height = gameSettings.canvasHeight;
    gameInstance.context = this.canvas.getContext('2d');
    this.init();
  }

  init() {
    this.tiles.init();
    this.drawTile();
    this.loadTileImage();
  }

  drawTile() {
    grid.data = [];
    for (let row = 0; row < gameInstance.tiles.layers[0].height; row += 1) {
      for (
        let column = 0;
        column < gameInstance.tiles.layers[0].width;
        column += 1
      ) {
        const tileType = getTileType(column, row);
        const x = column * gameInstance.tiles.tilewidth;
        const y = row * gameInstance.tiles.tileheight;
        const distance = 9999999;
        grid.data.push({
          index: getTileIndex(column, row),
          x,
          y,
          column,
          row,
          tileType,
          distance,
          isWall: tileType !== 0 && tileType !== 17 && tileType !== 18,
          isStartNode: false,
          isEndNode: false,
          isVisited: false,
          parentNode: null,
          h: 9999,
          g: 9999,
        });
      }
    }
  }

  loadTileImage() {
    this.tileImage = new Image();
    this.tileImage.src = gameInstance.tiles.tilesets[0].image;
    this.tileImage.addEventListener('load', () => {
      this.makeTiles();
    });
  }

  makeTiles() {
    for (let row = 0; row < gameInstance.tiles.layers[0].height; row += 1) {
      for (
        let column = 0;
        column < gameInstance.tiles.layers[0].width;
        column += 1
      ) {
        const tileType = getTileType(column, row);
        const x = column * gameInstance.tiles.tilewidth;
        const y = row * gameInstance.tiles.tileheight;
        drawTileImage(gameInstance.context, this.tileImage, tileType, x, y);
      }
    }
  }
}
