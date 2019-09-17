import History from './History';
import Cell from './Cell';
import Crowd from './Crowd';
import Listener from './Listener';
import Props from '../lifegame.config.json';

export default new (class HistoryList {
  static Limit = 5;
  private histories: Array<History> = [];
  private listener: Listener | null = null;

  constructor() {}

  setup(listener?: Listener) {
    this.histories = [];
    if (listener !== undefined) {
      this.listener = listener;
    }
  }

  add(crowd: Crowd) {
    if (!Props.enableDetectStagnation) return;
    this.histories.push(new History(crowd));
    if (this.histories.length > HistoryList.Limit) {
      this.histories.shift();
    }
    if (this.listener !== null && this.isGameStagnated()) {
      this.listener.apply(this);
    }
  }

  private isGameStagnated(): boolean {
    return [...this.histories].reverse().some((hist, idx, hists) => {
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
    });
  }
})();
