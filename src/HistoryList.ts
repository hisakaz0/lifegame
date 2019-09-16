import History from './History';
import Cell from './Cell';
import Crowd from './Crowd';

export default new (class HistoryList {
  static Limit = 5;
  private histories: Array<History>;
  private listener: (() => void) | null;

  constructor() {
    this.histories = [];
    this.listener = null;
  }

  setup(listener: () => void) {
    this.listener = listener;
  }

  add(crowd: Crowd) {
    this.histories.push(new History(crowd));
    if (this.histories.length > HistoryList.Limit) {
      this.histories.shift();
    }
    if (this.listener !== null && this.checkIsGameStagnated()) {
      this.listener.apply(this);
    }
  }

  private checkIsGameStagnated(): boolean {
    const reversed = [...this.histories].reverse();
    return (
      reversed
        .map((hist, idx, hists) => {
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
        .filter((v) => v === true).length > 0
    );
  }
})();
