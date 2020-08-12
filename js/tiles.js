import tilesSprite from './utils/tilesSprite.js';
import gameInstance from './globals/game.instance.js';

export default class Tiles {
  init() {
    this.tiles = JSON.parse(JSON.stringify(tilesSprite));
    gameInstance.tiles = this.tiles;
  }
}
