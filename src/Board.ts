import State from './State';
import Cell from './Cell';
import Crowd from './Crowd';
import Point from './Point';
import Size from './Size';
import Props from '../lifegame.config.json';
import RandomRect from './RandomRect';

const deadClass = 'dead';

const getState = function(ele: Element): State {
  return ele.classList.contains(deadClass) ? State.Dead : State.Alive;
};

const setState = function(ele: Element, state: State) {
  const l = ele.classList;
  state === State.Alive ? l.remove(deadClass) : l.add(deadClass);
};

const getBoardEle = function(): Element | null {
  return document.getElementById('board');
};

const displayTo = function(aElement: string, withContent: string) {
  const ele = document.getElementById(aElement);
  if (ele !== null) {
    ele.textContent = withContent;
  }
};

export default new (class Board {
  private size: Size;

  constructor(size: Size) {
    this.size = size;
  }

  public create() {
    const { x, y } = this.size;
    const board = getBoardEle();
    if (board === null) return;

    [...Array(y)]
      .map(() => {
        const row = document.createElement('div');
        row.classList.add('row');
        return row;
      })
      .map((row) => {
        [...Array(x)]
          .map(() => {
            const blk = document.createElement('div');
            blk.classList.add('blk');
            return blk;
          })
          .forEach((blk) => row.appendChild(blk));
        return row;
      })
      .forEach((row) => {
        board.appendChild(row);
      });
  }

  public setup() {
    const initializer = new RandomRect(
      this.size,
      { x: 10, y: 10 },
      { x: 30, y: 30 }
    );
    this.setCrowd(initializer.generateMap());
  }

  public setCrowd(crowd: Crowd) {
    const board = getBoardEle();
    if (board === null) return;
    crowd.cells.forEach(({ pos, state }) => {
      const row = board.children[pos.y];
      const blk = row.children[pos.x];
      if (getState(blk) !== state) {
        setState(blk, state);
      }
    });
  }

  public getCrowd(): Crowd | null {
    const board = getBoardEle();
    if (board === null) return null;
    const rows = Array.from(board.children);
    const cells = rows
      .map((row, yi) => {
        const blks = Array.from(row.children);
        return blks.map((blk, xi) => {
          return new Cell({ x: xi, y: yi }, getState(blk));
        });
      })
      .flat();
    return new Crowd(cells);
  }

  displayPopulation(count: number) {
    displayTo('population', String(count));
  }

  displayStep(count: number) {
    displayTo('step', String(count));
  }

  setStopMode() {
    const ele = document.getElementById('resume-or-stop');
    if (ele !== null) {
      ele.textContent = 'Resume';
    }
  }
})(Props.size);
