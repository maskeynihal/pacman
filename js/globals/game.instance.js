export default {
  score: 0,
  context: null,
  pacmans: [],
  ghosts: [],
  gameOver: false,
  frames: 0,
  time: null,
  gameStatus: {
    currentGameStatus: 1,
    startGame: 1,
    playing: 2,
    gameOver: 3,
  },
  gameLevelStatus: {
    currentGameStatus: 0,
    singlePlayer: {
      easy: 11,
      medium: 12,
      hard: 13,
      extreme: 14,
    },
    multiPlayer: {
      easy: 21,
      medium: 22,
      hard: 23,
    },
  },
  currentGameMode: {
    mode: '',
    level: '',
  },
  eatBigDot: 0,
  currentPosition: {
    ghosts: {
      red: {
        x: 0,
        y: 0,
        column: 0,
        row: 0,
      },
      blue: {
        x: 0,
        y: 0,
        column: 0,
        row: 0,
      },
      pink: {
        x: 0,
        y: 0,
        column: 0,
        row: 0,
      },
      orange: {
        x: 0,
        y: 0,
        column: 0,
        row: 0,
      },
    },
    pacmans: {
      player1: {
        x: 0,
        y: 0,
        column: 0,
        row: 0,
      },
      player2: {
        x: 0,
        y: 0,
        column: 0,
        row: 0,
      },
    },
    powers: {
      speedCherry: {
        x: 0,
        y: 0,
        column: 0,
        row: 0,
      },
      ghostWrap: {
        x: 0,
        y: 0,
        column: 0,
        row: 0,
      },
    },
  },
  tiles: {},
  buttons: {
    singlePlayer: {
      easy: null,
      medium: null,
      hard: null,
      extreme: null,
    },
    multiPlayer: {
      easy: null,
      medium: null,
      hard: null,
    },
    scoreboard: null,
    backButton: null,
  },
  gameLoopId: null,
  speedCherryIntervalId: null,
  ghostWrapIntervalId: null,
  totalDotsRemaining: 0,
  isMute: false,
  intervalId: [],
};
