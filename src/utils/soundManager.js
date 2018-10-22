import Sound from "react-native-sound"

var CurrentSound;
const init = (path) => {
  return new Promise((resolve, reject) => {
    CurrentSound = new Sound(path, '', err => {
      if (err) {
        release();
        return reject(err);
      } else {
        return resolve(CurrentSound);
      }
    })
  })
}

const isLoaded = () => {
  if (CurrentSound) {
    return CurrentSound.isLoaded();
  }
  return false;
}

const isPlaying = () => {
  if (CurrentSound) {
    return CurrentSound.isPlaying();
  }
  return false;
}

const pause = () => {
  if (CurrentSound) {
    CurrentSound.pause();
  }
}

const play = () => {
  if (CurrentSound) {
    CurrentSound.play();
  }
}

const release = () => {
  if (CurrentSound) {
    CurrentSound.release();
    CurrentSound = null;
  }
}

export { init, CurrentSound, release, pause, play, isPlaying, isLoaded }