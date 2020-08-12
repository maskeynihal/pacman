import Ghost from './ghost.js';
import gameInstance from '../../globals/game.instance.js';
import Astar from '../../algortithm/astar.js';
import { blueGhostTarget } from './target.js';

export default class BlueGhost extends Ghost {
  constructor(image, ghostColor) {
    super(image, ghostColor);
    this.animationIndex = 1;
    this.algorithm;
    this.visited = [];
    this.test;
    this.steps = 0;
  }

  setAlgorithm() {
    this.algorithm = new Astar(this.ghostColor);
    this.callAlgorithm();
    // calculate new path every second
    // TODO value of interval can be made fast so that calculation of path can be done fast according to level
    const intervalId = setInterval(() => {
      if (
        gameInstance.gameStatus.currentGameStatus ===
        gameInstance.gameStatus.playing
      ) {
        this.pathCounterIndex = 0;
        this.callAlgorithm();
      }
    }, 1000);

    gameInstance.intervalId.push(intervalId);
  }

  callAlgorithm() {
    this.visited = [];
    this.shortestPath = [];
    this.algorithm.init(this.getPosition(), this.ghostTarget());
    this.shortestPath = this.algorithm.algorithm();
  }

  randomMovement() {}

  nextPositionUpdate(x, y) {
    this.changeDirection();
    this.hitWall(x, y);
  }

  ghostTarget() {
    const { mode, level } = gameInstance.currentGameMode;
    return blueGhostTarget[mode][level].getPosition();
  }
}
