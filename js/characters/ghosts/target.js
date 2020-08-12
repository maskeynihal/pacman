import gameInstance from '../../globals/game.instance.js';
import gameSettings from '../../utils/game.settings.js';
import {
  getRandomNumber,
  getIndex,
  isAllowedSpace,
} from '../../utils/helper.js';

const multiPlayerRandomTarget = (mainTarget, secondTarget) => {
  if (gameInstance.eatBigDot <= 0) {
    if (gameInstance.pacmans[mainTarget].isFreeze) {
      return gameInstance.pacmans[secondTarget].getPosition();
    }
    return gameInstance.pacmans[mainTarget].getPosition();
  }
  const randomNumber = getRandomNumber(0, gameSettings.targetNode.length - 1);
  return gameSettings.targetNode[randomNumber];
};

const singlePlayerRandomTarget = (mainTarget, offset) => {
  if (gameInstance.eatBigDot <= 0) {
    return gameInstance.pacmans[mainTarget].getPosition();
  }
  const randomNumber = getRandomNumber(0, gameSettings.targetNode.length - 1);
  return gameSettings.targetNode[randomNumber];
};
// main target palyer 1 in multi
const redGhostTarget = {
  single: {
    easy: {
      getPosition() {
        return singlePlayerRandomTarget(0, 5);
      },
    },
    medium: {
      getPosition() {
        return singlePlayerRandomTarget(0, 3);
      },
    },
    hard: {
      getPosition() {
        return singlePlayerRandomTarget(0, 1);
      },
    },
    extreme: {
      getPosition() {
        return singlePlayerRandomTarget(0, 1);
      },
    },
  },
  multi: {
    easy: {
      getPosition() {
        return multiPlayerRandomTarget(0, 1);
      },
    },
    medium: {
      getPosition() {
        return multiPlayerRandomTarget(0, 1);
      },
    },
    hard: {
      getPosition() {
        return multiPlayerRandomTarget(0, 1);
      },
    },
  },
};

// main target palyer 2 in multi
const blueGhostTarget = {
  single: {
    easy: {
      getPosition() {
        return singlePlayerRandomTarget(0, 5);
      },
    },
    medium: {
      getPosition() {
        return singlePlayerRandomTarget(0, 4);
      },
    },
    hard: {
      getPosition() {
        return singlePlayerRandomTarget(0, 2);
      },
    },
    extreme: {
      getPosition() {
        return singlePlayerRandomTarget(0, 1);
      },
    },
  },
  multi: {
    easy: {
      getPosition() {
        return multiPlayerRandomTarget(1, 0);
      },
    },
    medium: {
      getPosition() {
        return multiPlayerRandomTarget(1, 0);
      },
    },
    hard: {
      getPosition() {
        return multiPlayerRandomTarget(1, 0);
      },
    },
    extreme: {
      getPosition() {
        return singlePlayerRandomTarget(0, 1);
      },
    },
  },
};

// main target is player 2 in multiplayer
const orangeGhostTarget = {
  single: {
    easy: {
      getPosition() {
        return singlePlayerRandomTarget(0, 5);
      },
    },
    medium: {
      getPosition() {
        return singlePlayerRandomTarget(0, 4);
      },
    },
    hard: {
      getPosition() {
        return singlePlayerRandomTarget(0, 2);
      },
    },
    extreme: {
      getPosition() {
        return singlePlayerRandomTarget(0, 1);
      },
    },
  },
  multi: {
    easy: {
      getPosition() {
        return multiPlayerRandomTarget(1, 0);
      },
    },
    medium: {
      getPosition() {
        return multiPlayerRandomTarget(1, 0);
      },
    },
    hard: {
      getPosition() {
        return multiPlayerRandomTarget(1, 0);
      },
    },
  },
};

// main target is player 2 in multiplayer
const pinkGhostTarget = {
  single: {
    easy: {
      getPosition() {
        return singlePlayerRandomTarget(0, 5);
      },
    },
    medium: {
      getPosition() {
        return singlePlayerRandomTarget(0, 4);
      },
    },
    hard: {
      getPosition() {
        return singlePlayerRandomTarget(0, 2);
      },
    },
    extreme: {
      getPosition() {
        return singlePlayerRandomTarget(0, 1);
      },
    },
  },
  multi: {
    easy: {
      getPosition() {
        return multiPlayerRandomTarget(1, 0);
      },
    },
    medium: {
      getPosition() {
        return multiPlayerRandomTarget(1, 0);
      },
    },
    hard: {
      getPosition() {
        return multiPlayerRandomTarget(1, 0);
      },
    },
  },
};

export { redGhostTarget, blueGhostTarget, orangeGhostTarget, pinkGhostTarget };
