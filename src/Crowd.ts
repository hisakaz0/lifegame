import Props from './Props';
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
    const flatRet = xs
      .map((xi) => {
        return ys.map((yi) => {
          return this.cells.find((neighbor) => {
            if (
              neighbor === undefined ||
              (neighbor.pos.x === xs[1] && neighbor.pos.y === ys[1])
            ) {
              return false;
            }
            return xi === neighbor.pos.x && yi === neighbor.pos.y;
          });
        });
      })
      .flat()
      .filter((neighbor) => neighbor !== undefined);
    return flatRet as Array<Cell>;
  }

  getPopulation(): number {
    return this.cells.filter((cell) => {
      return cell.state === State.Alive;
    }).length;
  }
}
