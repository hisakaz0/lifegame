import Props from '../lifegame.config.json';
import Cell from './Cell';
import State from './State';

const size = Props.size;

export default class Crowd {
  cells: Array<Cell>;

  constructor(cells: Array<Cell>) {
    this.cells = cells;
  }

  next(): Crowd {
    return new Crowd(
      this.cells.map((cell) => {
        return cell.next(this.getAroundCells(cell));
      })
    );
  }

  getAroundCells(target: Cell): Array<Cell> {
    const { x, y } = target.pos;
    const xs: Array<number> = [
      x === 0 ? size.x - 1 : x - 1,
      x,
      x === size.x - 1 ? 0 : x + 1,
    ];
    const ys: Array<number> = [
      y === 0 ? size.y - 1 : y - 1,
      y,
      y === size.y - 1 ? 0 : y + 1,
    ];
    // Array.prototype.findは遅いため
    const indexer = (x: number, y: number, ysize: number) => x + y * ysize;
    return xs
      .map((xi, xsi) => {
        return ys.map((yi, ysi) => {
          if (xsi === 1 && ysi === 1) return null;
          return this.cells[indexer(xi, yi, size.y)];
        });
      })
      .flat()
      .filter((ret) => ret != null) as Array<Cell>;
  }

  getPopulation(): number {
    return this.cells.filter((cell) => {
      return cell.state === State.Alive;
    }).length;
  }
}
