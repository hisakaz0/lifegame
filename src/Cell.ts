import Point from './Point';
import State from './State';

export default class Cell {
  public readonly pos: Point;
  public readonly state: State;

  constructor(pos: Point, state: State = State.Dead) {
    this.pos = pos;
    this.state = state;
  }

  public next(neighbors: Array<Cell>): Cell {
    const numAlive: number = neighbors.filter((n) => n.state === State.Alive)
      .length;
    const next =
      (this.state === State.Alive && (numAlive === 2 || numAlive === 3)) ||
      (this.state === State.Dead && numAlive === 3)
        ? State.Alive
        : State.Dead;
    return new Cell(this.pos, next);
  }
}
