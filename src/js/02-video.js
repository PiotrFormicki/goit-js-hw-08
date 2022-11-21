import Player from '@vimeo/player';
import { throttle } from 'lodash';
const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

player.on('play', () => {
  console.log('played the video!');
});

player.getVideoTitle().then(title => {
  console.log('title:', title);
});
const savePlayerTime = ({ duration, percent, seconds }) => {
  // console.log(seconds);
  localStorage.setItem('videoplayer-current-time', seconds);
};
player.on('timeupdate', throttle(savePlayerTime, 1000));

const getLocalLastTime = () => {
  const defaultTime = 0;
  try {
    const locallySavedTime = localStorage.getItem('videoplayer-current-time');
    if (!locallySavedTime) return defaultTime; //zresetuj czas ogladania

    const parsedTime = JSON.parse(locallySavedTime); // string
    return Number(parsedTime); //string na number
  } catch (error) {
    console.log({ error });
    return defaultTime; //jesli error to ustaw defaultowy time
  }
};

const resumePlayerOnLastPlayed = () => {
  const lastPlayedTime = getLocalLastTime();
  player.setCurrentTime(lastPlayedTime);
};
resumePlayerOnLastPlayed();
