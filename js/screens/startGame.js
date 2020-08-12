import gameSettings from '../utils/game.settings.js';
import { buttonComponent, muteButtonComponent } from './components.js';
import gameInstance from '../globals/game.instance.js';
import sound from '../sounds/sound.js';

export default class StartGame {
  constructor() {
    this.build();
    this.screen;
  }

  build() {
    this.makeScreen();
  }

  makeScreen() {
    this.screen = document.createElement('div');
    this.screen.classList.add('screen');
    this.screen.setAttribute('id', 'screen');
    this.screen.style.width = `${gameSettings.canvasWidth}px`;
    this.screen.style.height = `${gameSettings.canvasHeight}px`;
    const gameDiv = document.getElementById('game');
    gameDiv.appendChild(this.screen);

    const buttonContainerSinglePlayer = document.createElement('div');
    buttonContainerSinglePlayer.classList.add('buttonContainer');
    this.screen.appendChild(buttonContainerSinglePlayer);

    const buttonContainerMultiPlayer = document.createElement('div');
    buttonContainerMultiPlayer.classList.add('buttonContainer');
    this.screen.appendChild(buttonContainerMultiPlayer);

    const buttonContainerScoreboard = document.createElement('div');
    buttonContainerScoreboard.classList.add('buttonContainer');
    this.screen.appendChild(buttonContainerScoreboard);

    gameInstance.buttons.singlePlayer.easy = buttonComponent(
      'Single Player Easy',
      buttonContainerSinglePlayer
    );

    gameInstance.buttons.singlePlayer.medium = buttonComponent(
      'Single Player Medium',
      buttonContainerSinglePlayer
    );

    gameInstance.buttons.singlePlayer.hard = buttonComponent(
      'Single Player Hard',
      buttonContainerSinglePlayer
    );

    gameInstance.buttons.multiPlayer.easy = buttonComponent(
      'Multi Player Easy',
      buttonContainerMultiPlayer
    );

    gameInstance.buttons.multiPlayer.medium = buttonComponent(
      'Multi Player Medium',
      buttonContainerMultiPlayer
    );

    gameInstance.buttons.multiPlayer.hard = buttonComponent(
      'Multi Player Hard',
      buttonContainerMultiPlayer
    );

    gameInstance.buttons.scoreboard = buttonComponent(
      'Score Board',
      buttonContainerScoreboard
    );

    gameInstance.buttons.singlePlayer.extreme = buttonComponent(
      'Extreme Level',
      buttonContainerScoreboard
    );

    const muteButton = muteButtonComponent();

    this.showScreen();
  }

  hideScreen() {
    sound.gameStart.stop();
    this.screen.style.display = 'none';
  }

  showScreen() {
    this.screen.style.display = 'flex';
  }
}
