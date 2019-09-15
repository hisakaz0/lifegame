
import History from './History';

export default class LifegameHistory {
  constructor() {
    this.histories = [];
    this.LIMIT = 5;
  }

  setup(listener) {
    this.listener = listener;
  }

  add(aHistory) {
    this.histories.push(new History(aHistory));
    if (this.histories.length > this.LIMIT) {
      this.histories.shift();
    }
    if (this.checkIsGameStagnated()) {
      this.listener.apply();
    }
  }

  checkIsGameStagnated() {
    const reversedHistories = [...this.histories].reverse();
    return reversedHistories.map((hist, idx, hists) => {
      if (idx > 0) return false;
      let ret = false;
      if (idx === 0 && hists.length > 3) {
        ret = hists[0].isEqual(hists[2]);
      }
      if (ret) return true;
      if (idx === 0 && hists.length > 2) {
        ret = hists[0].isEqual(hists[1]);
      }
      return ret;
    })
      .filter((v) => v === true)
      .length > 0;
  }
}
