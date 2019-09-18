import State from './State';
import Cell from './Cell';
import Crowd from './Crowd';
import Point from './Point';
import Size from './Size';
import Props from '../lifegame.config.json';
import RandomRect from './RandomRect';
import CellConfig from './CellConfig';

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
  private cellConfig: CellConfig;
  private canvas: CanvasRenderingContext2D | null = null;

  constructor(size: Size, cellConfig: CellConfig) {
    this.size = size;
    this.cellConfig = cellConfig;
  }

  public create() {
    const board = getBoardEle() as HTMLCanvasElement;
    if (board === null) return;

    board.width = this.size.x * this.cellConfig.size;
    board.height = this.size.y * this.cellConfig.size;
    this.canvas = board.getContext('2d');
    if (this.canvas === null) return;
    this.canvas.lineWidth = 0.2;
  }

  public setCrowd(currCrowd: Crowd, prevCrowd?: Crowd) {
    const size = this.cellConfig.size;

    const draw = (
      canvas: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      prevState: State | null,
      currState: State,
      drawBorder: boolean
    ) => {
      // TODO: 無駄な描画しないときに枠線が残る
      // if (currState == prevState) return;
      canvas.fillStyle = currState === State.Dead ? 'white' : 'cyan';
      canvas.fillRect(x, y, w, h);

      if (drawBorder && currState === State.Alive) {
        canvas.strokeStyle = 'darkblue';
        canvas.strokeRect(x, y, w, h);
      }
    };

    currCrowd.cells.forEach((curr, idx) => {
      if (this.canvas === null) return;

      const prevState =
        prevCrowd === undefined ? null : prevCrowd.cells[idx].state;
      const p = curr.pos;
      const s = this.cellConfig.size;
      draw(
        this.canvas,
        s * p.x,
        s * p.y,
        s,
        s,
        prevState,
        curr.state,
        this.cellConfig.drawBorder
      );
    });
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
})(Props.board.size, Props.board.cell);
