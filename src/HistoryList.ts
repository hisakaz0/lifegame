import History from './History';
import Cell from './Cell';
import Crowd from './Crowd';
import Listener from './Listener';
import Props from '../lifegame.config.json';

export default new (class HistoryList {
  static Limit = Props.stagnationDetect.historyLimit;
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
    if (!Props.stagnationDetect.enable) return;
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
      if (idx === 0) return false;
      return hists[0].isEqual(hist);
    });
  }
})();
