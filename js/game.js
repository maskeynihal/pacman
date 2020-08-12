import Playground from './playground.js';
import gameInstance from './globals/game.instance.js';
import {
  resetFrames,
  clearScreen,
  changeGameLevelStatus,
  contactWithGhost,
} from './utils/helper.js';
import gameSettings from './utils/game.settings.js';
import Control from './control.js';
import ScoreCard from './scoreCard.js';
import StartGame from './screens/startGame.js';
import GameOverScreen from './screens/gameOver.js';
import setupGame from './setupGame.js';
import SpeedCherry from './powers/speedCherry.js';
import GhostWrap from './powers/ghostWrap.js';
import sound from './sounds/sound.js';
import ScoreBoard from './screens/scoreBoard.js';

export default class Game {
  constructor() {
    this.pacmans = [];
    gameInstance.ghosts = [];
    this.redGhost;
    this.control;
    this.screens = {
      startGame: null,
      gameOver: null,
      gamePause: null,
      scoreBoard: null,
    };
    this.speedCherry;
    this.ghostWrap;
    this.build();
  }

  /**
   * build required during instantiation of class
   */
  build() {
    this.instantiatePlayground();
    // this.makePacman();
    this.setupControl();
    this.setupScoreCard();
    this.loadGhostSprite();
    this.loadScreen();
    this.setupScoreBoard();
    this.setupPowers();
    this.addButtonEventListener();
  }

  setupPowers() {
    this.setupSpeedCherry();
    this.setupGhostWrap();
  }

  /**
   * initialize speed cherry power
   */
  setupSpeedCherry() {
    this.speedCherry = new SpeedCherry();
  }

  /**
   * initialize ghost trap
   */
  setupGhostWrap() {
    this.ghostWrap = new GhostWrap();
  }

  instantiatePlayground() {
    this.playground = new Playground();
  }

  loadScreen() {
    this.screens.startGame = new StartGame();
    this.screens.gameOver = new GameOverScreen();
  }

  makePacman() {
    setupGame.makePacman();
  }

  /**
   * loads ghost sprite
   */
  loadGhostSprite() {
    this.ghostSprite = new Image();
    this.ghostSprite.src = gameSettings.ghosts.image;
  }

  makeGhost() {
    setupGame.makeGhost(this.ghostSprite);
  }

  setupControl() {
    this.control = new Control();
  }

  setupScoreCard() {
    this.scoreCard = new ScoreCard();
  }

  setupScoreBoard() {
    this.scoreBoard = new ScoreBoard();
  }

  /* main game lop */
  gameLoop(timestamp) {
    this.sounds();
    // check if contact with ghost
    this.contactWithGhost();
    // check if game is over on every loop
    this.isGameOver();
    clearScreen();
    if (gameInstance.frames < 60) {
      this.draw();
    }

    if (
      gameInstance.gameStatus.currentGameStatus ===
        gameInstance.gameStatus.playing &&
      gameInstance.frames > 60
    ) {
      this.update();
      this.frightenGhost();
    }

    if (
      gameInstance.gameStatus.currentGameStatus ===
      gameInstance.gameStatus.playing
    ) {
      gameInstance.gameLoopId = requestAnimationFrame((timestamp) =>
        this.gameLoop(timestamp)
      );
    }

    gameInstance.frames += 1;
  }

  update() {
    this.updateTiles();
    this.updatePacman();
    this.updateGhost();
    this.updateScoreboard();
    this.updateSpeedCherry();
    this.updateGhostWrap();
  }

  updateSpeedCherry() {
    this.speedCherry.draw();
  }

  updateGhostWrap() {
    this.ghostWrap.draw();
  }

  draw() {
    this.playground.makeTiles();
    gameInstance.pacmans.forEach((pacman) => pacman.draw());
    gameInstance.ghosts.forEach((ghost) => ghost.draw());
    this.updateScoreboard();
  }

  updatePacman() {
    gameInstance.pacmans.forEach((pacman) => {
      pacman.update();
    });
  }

  updateGhost() {
    gameInstance.ghosts.forEach((ghost) => {
      if (ghost.freezeFor > 0) {
        if (gameInstance.frames % 5 < 1) {
          ghost.freezeFor -= 1;
        }
        ghost.draw();
      } else {
        ghost.update();
      }
    });
  }

  updateTiles() {
    this.playground.makeTiles();
  }

  updateScoreboard() {
    this.scoreCard.update();
  }

  /**
   * checks if game is over or not, life of every pacman is 0, then game over
   */
  isGameOver() {
    let gameOverFlag = false;
    let lifeLostFlag = false;
    let isFreeze = false;

    if (gameInstance.currentGameMode.mode === 'multi') {
      gameOverFlag =
        gameInstance.pacmans[0].gameOverFlag &&
        gameInstance.pacmans[1].gameOverFlag;
      lifeLostFlag =
        gameInstance.pacmans[0].lifeLostFlag &&
        gameInstance.pacmans[1].lifeLostFlag;
      isFreeze =
        gameInstance.pacmans[0].isFreeze || gameInstance.pacmans[1].isFreeze;
    } else {
      gameOverFlag = gameInstance.pacmans[0].gameOverFlag;
      lifeLostFlag = gameInstance.pacmans[0].lifeLostFlag;
    }

    if (gameOverFlag || (gameInstance.totalDotsRemaining <= 0 && !isFreeze)) {
      gameInstance.gameStatus.currentGameStatus =
        gameInstance.gameStatus.gameOver;
      this.gameOver();
      return true;
    }

    if (lifeLostFlag) {
      this.softRestart();
    }

    return false;
  }

  gameOver() {
    if (
      gameInstance.gameStatus.currentGameStatus ===
      gameInstance.gameStatus.gameOver
    ) {
      cancelAnimationFrame(gameInstance.gameLoopId);
      this.screens.startGame.showScreen();
      this.screens.gameOver.show();
      this.storeScore();
      this.restartGame();
    }
  }

  storeScore() {
    gameInstance.pacmans.forEach((pacman) => {
      this.scoreBoard.saveScore(pacman.score);
    });
  }

  restartGame() {
    clearScreen();
    this.playground.init();
    gameInstance.pacmans.forEach((pacman) => {
      pacman.restartGame();
    });
    this.restartGhost();
    gameInstance.gameStatus.currentGameStatus ===
      gameInstance.gameStatus.gameOver;
  }

  restartGhost() {
    gameInstance.ghosts.forEach((ghost) => ghost.restart());
  }

  /**
   * add event listener to buttons on menu
   */
  addButtonEventListener() {
    const singlePlayerEasy = gameInstance.buttons.singlePlayer.easy;
    const singlePlayerMedium = gameInstance.buttons.singlePlayer.medium;
    const singlePlayerHard = gameInstance.buttons.singlePlayer.hard;
    const multiPlayerEasy = gameInstance.buttons.multiPlayer.easy;
    const multiPlayerMedium = gameInstance.buttons.multiPlayer.medium;
    const multiPlayerHard = gameInstance.buttons.multiPlayer.hard;
    const { scoreboard, backButton } = gameInstance.buttons;
    const extremeLevel = gameInstance.buttons.singlePlayer.extreme;

    singlePlayerEasy.addEventListener('click', () => {
      changeGameLevelStatus(gameInstance.gameLevelStatus.singlePlayer.easy);
      this.startGame();
    });

    singlePlayerMedium.addEventListener('click', () => {
      changeGameLevelStatus(gameInstance.gameLevelStatus.singlePlayer.medium);
      this.startGame();
    });

    singlePlayerHard.addEventListener('click', () => {
      changeGameLevelStatus(gameInstance.gameLevelStatus.singlePlayer.hard);
      this.startGame();
    });

    multiPlayerEasy.addEventListener('click', () => {
      changeGameLevelStatus(gameInstance.gameLevelStatus.multiPlayer.easy);
      this.startGame();
    });

    multiPlayerMedium.addEventListener('click', () => {
      changeGameLevelStatus(gameInstance.gameLevelStatus.multiPlayer.medium);
      this.startGame();
    });

    multiPlayerHard.addEventListener('click', () => {
      changeGameLevelStatus(gameInstance.gameLevelStatus.multiPlayer.hard);
      this.startGame();
    });

    scoreboard.addEventListener('click', () => {
      this.scoreBoard.show();
    });

    backButton.addEventListener('click', () => {
      this.scoreBoard.hide();
    });

    extremeLevel.addEventListener('click', () => {
      changeGameLevelStatus(gameInstance.gameLevelStatus.singlePlayer.extreme);
      this.startGame();
    });
  }

  /**
   * Restart pacman and ghost position after life is lost but game is not over
   */
  softRestart() {
    this.restartGhost();
    gameInstance.pacmans.forEach((pacman) => {
      pacman.resetLifeLostFlag();
      pacman.init();
    });
    resetFrames();
  }

  startGame() {
    if (
      gameInstance.gameStatus.currentGameStatus ===
        gameInstance.gameStatus.startGame ||
      gameInstance.gameStatus.currentGameStatus ===
        gameInstance.gameStatus.gameOver
    ) {
      // change game status to playing from game over or start game
      gameInstance.gameStatus.currentGameStatus =
        gameInstance.gameStatus.playing;

      // clear intervals
      this.clearInterval();
      this.init();

      if (gameInstance.gameLoopId) {
        cancelAnimationFrame(gameInstance.gameLoopId);
      }

      gameInstance.gameLoopId = requestAnimationFrame((timestamp) =>
        this.gameLoop(timestamp)
      );
    }
  }

  clearInterval() {
    gameInstance.intervalId.forEach((id) => clearInterval(id));
    gameInstance.intervalId = [];
  }

  init() {
    resetFrames();
    gameInstance.eatBigDot = 0;
    this.screens.startGame.hideScreen();
    this.screens.gameOver.hide();
    this.makePacman();
    this.makeGhost();
    gameInstance.pacmans.forEach((pacman) => pacman.init());
    gameInstance.ghosts.forEach((ghost) => ghost.init());
    this.speedCherry.setupGameMode();
    this.ghostWrap.setupGameMode();
    this.playground.init();
    gameInstance.totalDotsRemaining = gameSettings.totalDots;
  }

  frightenGhost() {
    if (gameInstance.eatBigDot > 0) {
      sound.frighten.play();
      gameInstance.eatBigDot -= 1;
    } else {
      sound.frighten.stop();
    }
  }

  contactWithGhost() {
    gameInstance.pacmans.forEach((pacman) => {
      contactWithGhost(pacman);
    });
  }

  sounds() {}
}
