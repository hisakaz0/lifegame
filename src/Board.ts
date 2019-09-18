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
  }

  // TODO: stateが変わらなかったら更新しない処理
  public setCrowd(crowd: Crowd) {
    const size = this.cellConfig.size;
    // TODO: indexerを使う
    crowd.cells.forEach(({ pos, state }) => {
      if (this.canvas === null) return;
      this.canvas.fillStyle = state === State.Dead ? 'white' : 'cyan';
      this.canvas.fillRect(size * pos.x, size * pos.y, size, size);

      if (this.cellConfig.drawBorder && state === State.Alive) {
        this.canvas.strokeStyle = 'darkblue';
        this.canvas.strokeRect(size * pos.x, size * pos.y, size, size);
      }
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
