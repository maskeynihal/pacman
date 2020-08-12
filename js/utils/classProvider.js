import RedGhost from '../characters/ghosts/redGhost.js';
import BlueGhost from '../characters/ghosts/blueGhost.js';
import OrangeGhost from '../characters/ghosts/orangeGhost.js';
import PinkGhost from '../characters/ghosts/pinkGhost.js';

const ghostsProvider = {
  red: {
    create(ghostSprite) {
      return new RedGhost(ghostSprite, 'red');
    },
  },
  blue: {
    create(ghostSprite) {
      return new BlueGhost(ghostSprite, 'blue');
    },
  },
  orange: {
    create(ghostSprite) {
      return new OrangeGhost(ghostSprite, 'orange');
    },
  },
  pink: {
    create(ghostSprite) {
      return new PinkGhost(ghostSprite, 'pink');
    },
  },
};

export { ghostsProvider };
