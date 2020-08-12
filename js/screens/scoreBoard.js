import gameSettings from '../utils/game.settings.js';
import { buttonComponent } from './components.js';
import gameInstance from '../globals/game.instance.js';

export default class Scoreboard {
  constructor() {
    this.init();
  }

  init() {
    this.makeScoreBoard();
  }

  makeScoreBoard() {
    this.scoreBoard = document.createElement('div');
    this.scoreBoard.classList.add('score-board', 'screen');
    this.scoreBoard.style.width = `${gameSettings.canvasWidth}px`;
    this.scoreBoard.style.height = `${gameSettings.canvasHeight}px`;
    const screenDiv = document.getElementById('screen');
    screenDiv.appendChild(this.scoreBoard);

    const buttonContainerBack = document.createElement('div');
    buttonContainerBack.classList.add('buttonContainer', 'backButtonContainer');
    this.scoreBoard.appendChild(buttonContainerBack);

    gameInstance.buttons.backButton = buttonComponent(
      'Back',
      buttonContainerBack
    );

    gameInstance.buttons.backButton.classList.add('back-button');

    // scoreboard heading
    const scoreBoardHeading = document.createElement('div');
    scoreBoardHeading.classList.add('buttonContainer', 'scoreboard-heading');
    this.scoreBoard.appendChild(scoreBoardHeading);

    // scoreboard heading html
    scoreBoardHeading.innerHTML = '<h1> SCOREBOARD </h1>';

    // scoreboard table
    this.scoreboardTable = document.createElement('div');
    this.scoreboardTable.classList.add('buttonContainer', 'scoreboard-table');
    this.scoreBoard.appendChild(this.scoreboardTable);

    this.singlePlayer = document.createElement('div');
    this.singlePlayer.classList.add('score-table');
    this.scoreboardTable.appendChild(this.singlePlayer);

    this.multiPlayer = document.createElement('div');
    this.multiPlayer.classList.add('score-table');
    this.scoreboardTable.appendChild(this.multiPlayer);
  }

  makeScoreboardTable(gameMode) {
    const playerScore = this.getAllScore(gameMode);
    const title = `${gameMode}Player`.toUpperCase();
    let scoreHtml = '';
    for (let index = 0; index < Math.min(playerScore.length, 10); index += 1) {
      const score = playerScore[index];
      scoreHtml += `<tr>
        <td>
          ${index + 1}
        </td>
        <td>
          ${score}
        </td>
      </tr>`;
    }
    return `
    <h2> ${title} </h2>
      <table>
        <tr>
          <th>RANK</th>
          <th>SCORE</th>
        </tr>
        ${scoreHtml}
      </table>`;
  }

  show() {
    this.singlePlayer.innerHTML = this.makeScoreboardTable('single');
    this.multiPlayer.innerHTML = this.makeScoreboardTable('multi');
    this.scoreBoard.style.display = 'flex';
  }

  hide() {
    this.scoreBoard.style.display = 'none';
  }

  getAllScore(gameMode) {
    const singlePlayerScore = JSON.parse(
      localStorage.getItem(`${gameMode}PlayerPacmanScore`)
    );
    return singlePlayerScore ? singlePlayerScore.sort((a, b) => b - a) : [];
  }

  saveScore(score) {
    let allScores = this.getAllScore(gameInstance.currentGameMode.mode);
    if (!allScores) {
      allScores = [];
    }
    // add new score
    allScores.push(score);
    localStorage.setItem(
      `${gameInstance.currentGameMode.mode}PlayerPacmanScore`,
      JSON.stringify(allScores)
    );
  }
}
