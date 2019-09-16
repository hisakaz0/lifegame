import Board from './Board';
import Chart from './Chart';
import Props from './Props';
import HistoryList from './HistoryList';
import ResultList from './ResultList';
import Controller from './Controller';

export default new (class Lifegame {
  private step: number = 1;
  private population: number = 0;
  private tid: number = -1;
  private isStagnated: boolean = false;

  constructor() {}

  isStoped(): boolean {
    return tid === -1;
  }

  setup() {
    Board.create();
    Board.setup();
    Chart.setup();
    HistoryList.setup(this.onStagnated);
    ResultList.setup();
    Controller.setup(this, Board, Chart, ResultList);
  }

  resume() {
    if (this.isStagnated) return;
    this.tid = setTimeout(() => {
      Board.setResumeMode();
      this.next();
      this.resume();
    }, Props.interval);
  }

  next() {
    // get current cells
    const currentCrowd = Board.getCrowd();
    if (currentCrowd === null) return;

    // calculate next
    const nextCrowd = currentCrowd.next();
    this.population = nextCrowd.getPopulation();
    this.step = this.step + 1;

    // display to the board
    Board.displayPopulation(this.population);
    Board.displayStep(this.step);
    Chart.update(this.step, this.population);
    HistoryList.add(nextCrowd);
  }

  onStagnated() {
    this.isStagnated = true;
  }

  onResetButtonClicked() {
    clearTimeout(this.tid);
    this.tid = -1;
    Board.reset();
    this.isStagnated = false;
  }

  stop() {
    clearTimeout(this.tid);
    this.tid = -1;
    Board.setStopMode();
  }
})();
