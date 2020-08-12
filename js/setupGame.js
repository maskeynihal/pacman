import gameInstance from './globals/game.instance.js';
import gameSettings from './utils/game.settings.js';
import { changeGhostFeature } from './utils/helper.js';
import { ghostsProvider } from './utils/classProvider.js';
import Pacman from './characters/pacman.js';

export default class SetupGame {
  /**
   * Change ghost feature according to level and mode
   */
  static setupGhostFeature() {
    switch (gameInstance.gameLevelStatus.currentGameStatus) {
      case gameInstance.gameLevelStatus.singlePlayer.easy:
        changeGhostFeature('red', 'single', 'easy');
        changeGhostFeature('blue', 'single', 'easy');
        break;

      case gameInstance.gameLevelStatus.singlePlayer.medium:
        changeGhostFeature('red', 'single', 'medium');
        changeGhostFeature('blue', 'single', 'medium');
        changeGhostFeature('pink', 'single', 'medium');
        break;

      default:
        changeGhostFeature('red', 'single', 'hard');
        changeGhostFeature('blue', 'single', 'hard');
        changeGhostFeature('pink', 'single', 'hard');
        changeGhostFeature('orange', 'single', 'hard');
        break;
    }
  }

  /**
   * Create ghost instance according to game mode and level
   */
  static makeGhost(ghostSprite) {
    SetupGame.setupGhostFeature();

    const ghostTypes = Object.keys(
      gameSettings.setupGameAsPerLevel[gameInstance.currentGameMode.mode][
        gameInstance.currentGameMode.level
      ].ghostTypes
    );
    gameInstance.ghosts = [];
    ghostTypes.forEach((ghostType) =>
      gameInstance.ghosts.push(ghostsProvider[ghostType].create(ghostSprite))
    );
  }

  static makePacman() {
    const currentMode = gameInstance.currentGameMode.mode;
    gameInstance.pacmans = [];
    for (
      let index = 0;
      index < gameSettings.setupGameAsPerLevel[currentMode].totalPacman;
      index += 1
    ) {
      gameInstance.pacmans.push(new Pacman(index + 1));
    }
  }
}
