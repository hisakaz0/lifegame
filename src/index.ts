import Lifegame from './Lifegame';

document.addEventListener('DOMContentLoaded', () => {
  init();
});

const init = function() {
  Lifegame.setup();
  Lifegame.resume();
};
