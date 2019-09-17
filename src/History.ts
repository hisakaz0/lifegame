import Cell from './Cell';
import Crowd from './Crowd';

export default class History {
  private crowd: Crowd;

  constructor(crowd: Crowd) {
    this.crowd = crowd;
  }

  isEqual(aHistory: History) {
    const l1 = this.crowd.cells;
    const l2 = aHistory.crowd.cells;
    return l1.every((c1, idx) => {
      const c2 = l2[idx];
      return c1.state === c2.state;
    });
  }
}
