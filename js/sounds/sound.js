import soundSource from './soundSource.js';
import gameInstance from '../globals/game.instance.js';

export default {
  gameStart: {
    music: new Audio(soundSource.gameStart),
    play() {
      this.music.loop = true;
      this.music.autoplay = true;
      this.music.muted = gameInstance.isMute;
      this.music.play();
    },
    stop() {
      this.music.pause();
      this.music.currentTime = 0;
    },
  },
  munch: {
    music: new Audio(soundSource.munch),
    play() {
      this.music.muted = gameInstance.isMute;
      this.music.play();
    },
    stop() {
      this.music.pause();
      this.music.currentTime = 0;
    },
  },
  eatBigDot: {
    music: new Audio(soundSource.eatBigDot),
    play() {
      this.music.muted = gameInstance.isMute;
      this.music.play();
    },
    stop() {
      this.music.pause();
      this.music.currentTime = 0;
    },
  },
  frighten: {
    music: new Audio(soundSource.frighten),
    play() {
      this.music.muted = gameInstance.isMute;
      this.music.play();
    },
    stop() {
      this.music.pause();
      this.music.currentTime = 0;
    },
  },
  speedCherry: {
    music: new Audio(soundSource.speedCherry),
    play() {
      this.music.muted = gameInstance.isMute;
      this.music.play();
    },
    stop() {
      this.music.pause();
      this.music.currentTime = 0;
    },
  },
  pacmanDeath: {
    music: new Audio(soundSource.pacmanDeath),
    play() {
      this.music.muted = gameInstance.isMute;
      this.music.play();
    },
    stop() {
      this.music.pause();
      this.music.currentTime = 0;
    },
  },
  ghostDeath: {
    music: new Audio(soundSource.ghostDeath),
    play() {
      this.music.muted = gameInstance.isMute;
      this.music.play();
    },
    stop() {
      this.music.pause();
      this.music.currentTime = 0;
    },
  },
};
