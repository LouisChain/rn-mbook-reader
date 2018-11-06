import Sound from "react-native-sound";

var CurrentSound;
var isAndroidPlaying = false;
const init = path => {
  return new Promise((resolve, reject) => {
    CurrentSound = new Sound(path, "", err => {
      if (err) {
        release();
        return reject(err);
      } else {
        return resolve(CurrentSound);
      }
    })
  });
};

const isLoaded = () => {
  if (CurrentSound) {
    return CurrentSound.isLoaded();
  }
  return false;
};

const isPlaying = () => {
  if (CurrentSound) {
    return CurrentSound.isPlaying() || isAndroidPlaying;
  }
  return false;
};

const pause = () => {
  if (CurrentSound) {
    isAndroidPlaying = false;
    CurrentSound.pause();
  }
};

const play = cb => {
  if (CurrentSound) {
    isAndroidPlaying = true;
    CurrentSound.play(cb);
  }
};

const release = () => {
  if (CurrentSound) {
    isAndroidPlaying = false;
    CurrentSound.release();
    CurrentSound = null;
  }
};

const reset = () => {
  if (CurrentSound) {
    isAndroidPlaying = false;
    CurrentSound.reset();
    CurrentSound = null;
  }
};

const getCurrentTime = (cb) => {
  if (CurrentSound) {
    return CurrentSound.getCurrentTime(cb);
  }
  return 0;
};

export {
  init,
  CurrentSound,
  release,
  pause,
  play,
  isPlaying,
  isLoaded,
  reset,
  getCurrentTime
};
