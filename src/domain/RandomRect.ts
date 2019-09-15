
import createNumArray from '../helper';
import { randState, DEAD } from '../common';

export default class RandomRect {
  constructor(size, start, end) {
    this.size = size;
    this.start = start;
    this.end = end;
  }

  get({ x, y }) {
    return x >= this.start.x
      && x <= this.end.x
      && y >= this.start.y
      && y <= this.end.y
      ? randState() : DEAD;
  }

  createMap() {
    return createNumArray(this.size.y).map((yi) => createNumArray(this.size.x).map((xi) => (
      {
        x: xi,
        y: yi,
        state: this.get({ x: xi, y: yi }),
      }
    ))).flat();
  }
}
