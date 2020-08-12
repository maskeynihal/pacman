export default {
  canvasWidth: 560,
  canvasHeight: 720,
  gridSize: {
    width: 20,
    height: 20,
  },
  totalDots: 300,
  pacman: {
    image: './images/pacman20.png',
    increasedSpeed: 6,
    player1: {
      startColumn: 12,
      startRow: 20,
      freezeColumn: 11,
      freezeRow: 16,
      animationSpeed: 20,
      speed: 8,
    },
    player2: {
      startColumn: 14,
      startRow: 20,
      freezeColumn: 11,
      freezeRow: 16,
      animationSpeed: 20,
      speed: 8,
    },
  },
  direction: {
    left: 1,
    up: 2,
    right: 3,
    down: 4,
    noMovement: 5,
  },
  ghosts: {
    image: './images/ghost20.png',
    increasedSpeed: 50,
    characters: {
      red: {
        startColumn: 13,
        startRow: 15,
        animationSpeed: 20,
        speed: 15,
      },
      blue: {
        startColumn: 11,
        startRow: 18,
        animationSpeed: 20,
        speed: 15,
      },
      pink: {
        startColumn: 16,
        startRow: 16,
        animationSpeed: 60,
        speed: 15,
      },
      orange: {
        startColumn: 16,
        startRow: 18,
        animationSpeed: 20,
        speed: 15,
      },
    },
  },
  lives: 2,
  setupGameAsPerLevel: {
    single: {
      totalPacman: 1,
      lives: 2,
      easy: {
        totalGhost: 2,
        ghostTypes: {
          red: {
            speed: 20,
          },
          blue: {
            speed: 17,
          },
        },
      },
      medium: {
        totalGhost: 3,
        ghostTypes: {
          red: {
            speed: 15,
          },
          blue: {
            speed: 14,
          },
          pink: {
            speed: 15,
          },
        },
      },
      hard: {
        totalGhost: 4,
        ghostTypes: {
          red: {
            speed: 10,
          },
          blue: {
            speed: 10,
          },
          pink: {
            speed: 10,
          },
          orange: {
            speed: 10,
          },
        },
      },
      extreme: {
        totalGhost: 4,
        ghostTypes: {
          red: {
            speed: 10,
          },
          blue: {
            speed: 10,
          },
          pink: {
            speed: 10,
          },
          orange: {
            speed: 10,
          },
        },
      },
    },
    multi: {
      totalPacman: 2,
      lives: 1,
      easy: {
        totalGhost: 2,
        ghostTypes: {
          red: {
            speed: 20,
          },
          blue: {
            speed: 20,
          },
        },
      },
      medium: {
        totalGhost: 3,
        ghostTypes: {
          red: {
            speed: 15,
          },
          blue: {
            speed: 14,
          },
          pink: {
            speed: 13,
          },
        },
      },
      hard: {
        totalGhost: 4,
        ghostTypes: {
          red: {
            speed: 10,
          },
          blue: {
            speed: 10,
          },
          pink: {
            speed: 10,
          },
          orange: {
            speed: 10,
          },
        },
      },
    },
  },
  targetNode: [
    {
      column: 12,
      row: 18,
    },
    {
      column: 6,
      row: 8,
    },
    {
      column: 6,
      row: 23,
    },
    {
      column: 3,
      row: 29,
    },
    {
      column: 12,
      row: 32,
    },
    {
      column: 15,
      row: 32,
    },
    {
      column: 18,
      row: 26,
    },
    {
      column: 21,
      row: 26,
    },
    {
      column: 21,
      row: 23,
    },
    {
      column: 24,
      row: 29,
    },
    {
      column: 21,
      row: 17,
    },
    {
      column: 21,
      row: 11,
    },
    {
      column: 21,
      row: 8,
    },
    {
      column: 21,
      row: 4,
    },
    {
      column: 15,
      row: 8,
    },
    {
      column: 12,
      row: 8,
    },
    {
      column: 12,
      row: 14,
    },
    {
      column: 15,
      row: 14,
    },
    {
      column: 18,
      row: 17,
    },
    {
      column: 9,
      row: 17,
    },
    {
      column: 9,
      row: 20,
    },
    {
      column: 18,
      row: 20,
    },
  ],
  speedCherry: {
    image: './images/speedCherry20.png',
    easy: {
      timeInterval: 5000,
      timeOut: 3000,
      canHaveSpeedCherry: true,
    },
    medium: {
      timeInterval: 4000,
      timeOut: 3000,
      canHaveSpeedCherry: true,
    },
    hard: {
      timeInterval: 2000,
      timeOut: 1000,
      canHaveSpeedCherry: true,
    },
    extreme: {
      timeInterval: 0,
      timeOut: 1000,
      canHaveSpeedCherry: false,
    },
  },
  ghostWrap: {
    image: './images/wrap20.png',
    easy: {
      timeInterval: 5000,
      timeOut: 3000,
      canTrap: true,
    },
    medium: {
      timeInterval: 4000,
      timeOut: 3000,
      canTrap: true,
    },
    hard: {
      timeInterval: 2000,
      timeOut: 1000,
      canTrap: true,
    },
    extreme: {
      timeInterval: 2000,
      timeOut: 1000,
      canTrap: false,
    },
  },
};
