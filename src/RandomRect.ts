import Cell from './Cell';
import State from './State';
import Point from './Point';
import Size from './Size';
import Crowd from './Crowd';

export default class RandomRect {
  private size: Size;
  private start: Point;
  private end: Point;

  constructor(size: Size, start: Point, end: Point) {
    this.size = size;
    this.start = start;
    this.end = end;
  }

  get({ x, y }: Point): State {
    return x >= this.start.x &&
      x <= this.end.x &&
      y >= this.start.y &&
      y <= this.end.y
      ? this.randState()
      : State.Dead;
  }

  generateMap(): Crowd {
    const ret = [...Array(this.size.y)]
      .map((yi) => {
        return [...Array(this.size.x)].map((xi) => {
          const pos: Point = { x: xi, y: yi };
          return new Cell(pos, this.get(pos));
        });
      })
      .flat();
    return new Crowd(ret);
  }

  private randState(): State {
    return Math.round(Math.random()) === 1 ? State.Dead : State.Alive;
  }
}
