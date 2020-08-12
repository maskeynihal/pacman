import gameInstance from '../globals/game.instance.js';
import sound from '../sounds/sound.js';

const soundHtml = '<img src="./images/sound.png">';
const muteHtml = '<img src="./images/mute.png">';

const buttonComponent = (text, parent) => {
  const button = document.createElement('div');
  button.classList.add('button');
  button.innerText = text;
  parent.appendChild(button);
  return button;
};

const muteButtonComponent = () => {
  const parent = document.getElementById('game');
  const muteButton = document.createElement('div');

  muteButton.setAttribute('id', 'muteButton');
  muteButton.innerHTML = soundHtml;

  muteButton.addEventListener('click', () => {
    gameInstance.isMute = !gameInstance.isMute;
    gameInstance.isMute
      ? (muteButton.innerHTML = muteHtml)
      : (muteButton.innerHTML = soundHtml);

    if (
      gameInstance.gameStatus.currentGameStatus !==
      gameInstance.gameStatus.playing
    ) {
      sound.gameStart.play();
    }
  });

  parent.appendChild(muteButton);
};

export { buttonComponent, muteButtonComponent };
