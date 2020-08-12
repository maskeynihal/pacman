import gameInstance from './globals/game.instance.js';

export default class Control {
  constructor() {
    this.init();
  }

  init() {
    this.keyboardControl();
  }

  keyboardControl() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.option(event);
    });
  }

  option(event) {
    switch (event.keyCode) {
      case 65:
        gameInstance.pacmans[0].moveLeft();
        break;
      case 68:
        gameInstance.pacmans[0].moveRight();
        break;
      case 87:
        gameInstance.pacmans[0].moveUp();
        break;
      case 83:
        gameInstance.pacmans[0].moveDown();
        break;
      case 37:
        gameInstance.pacmans[1]
          ? gameInstance.pacmans[1].moveLeft()
          : gameInstance.pacmans[0].moveLeft();
        break;
      case 38:
        gameInstance.pacmans[1]
          ? gameInstance.pacmans[1].moveUp()
          : gameInstance.pacmans[0].moveUp();
        break;
      case 39:
        gameInstance.pacmans[1]
          ? gameInstance.pacmans[1].moveRight()
          : gameInstance.pacmans[0].moveRight();
        break;
      case 40:
        gameInstance.pacmans[1]
          ? gameInstance.pacmans[1].moveDown()
          : gameInstance.pacmans[0].moveDown();
        break;
      default:
        console.log('Press a to move left and d to move right');
        break;
    }
  }
}
