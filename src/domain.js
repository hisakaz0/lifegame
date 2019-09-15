
import { DEAD, ALIVE, randState } from './common';
import { createNumArray } from './helper';

const initializers = {};

initializers.RandomRect = class RandomRect {

  constructor(size, start, end) {
    this.size = size;
    this.start = start;
    this.end = end;
  }

  _get({ x, y }) {
    return x >= this.start.x &&
      x <= this.end.x &&
      y >= this.start.y &&
      y <= this.end.y
      ? randState() : DEAD
    ;
  }

  createMap() {
    return createNumArray(this.size.y).map((yi) =>
      createNumArray(this.size.x).map((xi) => (
        {
          x: xi,
          y: yi,
          state: this._get({ x: xi, y: yi })
        }
      ))
    ).flat();
  }
};

const nextState = (current, around) =>
  around.filter((e) => e === ALIVE).length
  |> ((numAlive) => (
    current === ALIVE && (numAlive === 2 || numAlive === 3)
  ) || (
    current === DEAD && numAlive === 3
  ))
;

const lifegameHistory = new class LifegameHistory {

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
      this.histories.shift()
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

class History {

  constructor(cells) {
    this.cells = cells;
  }

  isEqual(aHistory) {
    return this.cells
      .map((c1) => aHistory.cells
        .find((c2) =>
          c1.x === c2.x &&
          c1.y === c2.y &&
          c1.state === c2.state
        ))
      .filter((v) => v !== undefined)
      .length === this.cells.length;
  }
}

export { initializers, nextState, lifegameHistory, History };
