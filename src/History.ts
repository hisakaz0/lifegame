import Cell from './Cell';
import Crowd from './Crowd';

export default class History {
  private crowd: Crowd;

  constructor(crowd: Crowd) {
    this.crowd = crowd;
  }

  isEqual(aHistory: History) {
    return (
      this.crowd.cells
        .map((c1) =>
          aHistory.crowd.cells.find(
            (c2) =>
              c1.pos.x === c2.pos.x &&
              c1.pos.y === c2.pos.y &&
              c1.state === c2.state
          )
        )
        .filter((v) => v !== undefined).length === this.crowd.cells.length
    );
  }
}
