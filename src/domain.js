
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

export { initializers, nextState };
