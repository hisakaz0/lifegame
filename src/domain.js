
import { DEAD, randState } from './common';

const initializers = {};

initializers.RandomRect = class RandomRect {

  constructor(size, start, end) {
    this.size = size;
    this.start = start;
    this.end = end;
  }

  get({ x, y }) {
    return x >= this.start.x &&
      x <= this.end.x &&
      y >= this.start.y &&
      y <= this.end.y
      ? randState() : DEAD
    ;
  }
};

export { initializers };
