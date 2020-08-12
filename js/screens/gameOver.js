import gameInstance from '../globals/game.instance.js';

export default class GameOverScreen {
  constructor() {
    this.scoreCard = null;
    this.init();
  }

  init() {
    this.makeScoreCard();
  }

  makeScoreCard() {
    this.scoreCard = document.createElement('div');
    this.scoreCard.classList.add('score-card');
    const screenDiv = document.getElementById('screen');
    screenDiv.appendChild(this.scoreCard);
  }

  updateScore() {
    this.scoreCard.innerHTML = this.scoreHtml();
  }

  show() {
    this.updateScore();
    this.scoreCard.style.display = 'flex';
  }

  hide() {
    this.scoreCard.style.display = 'none';
  }

  scoreHtml() {
    if (gameInstance.pacmans[1]) {
      return `<h1> GAME OVER </h1><ul><li>PLAYER1 SCORE: ${gameInstance.pacmans[0].score}</li><li>PLAYER2 SCORE: ${gameInstance.pacmans[1].score}</li></ul>`;
    }
    return `<h1> GAME OVER </h1><ul><li>SCORE: ${gameInstance.pacmans[0].score}</li></ul>`;
  }
}
