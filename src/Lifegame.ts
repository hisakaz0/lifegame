import Board from './Board';
import Chart from './Chart';
import Props from '../lifegame.config.json';
import HistoryList from './HistoryList';
import ResultList from './ResultList';
import Controller from './Controller';
import LifegameCommand from './LifegameCommand';

export default new (class Lifegame implements LifegameCommand {
  private numOfGeneration: number = 1;
  private numOfPopulation: number = 0;
  private isStagnated: boolean = false;
  private tid: number = -1;

  constructor() {}

  isRunning(): boolean {
    return this.tid !== -1;
  }

  getPopulation() {
    return this.numOfPopulation;
  }

  getGeneration() {
    return this.numOfGeneration;
  }

  setup() {
    Board.create();
    Board.setup();
    Chart.setup();
    Controller.addOnClickResetButtonListener(() => {
      this.isStagnated = false;
      this.numOfGeneration = 1;
      this.numOfPopulation = 0;
      clearTimeout(this.tid);
      this.tid = -1;

      this.updateController();
      Board.setup();
      Chart.setup();
      HistoryList.setup();
    });
    Controller.addOnClickResumeStopButtonListener(() => {
      this.isRunning() ? this.stop() : this.resume();
      this.updateController();
    });
    HistoryList.setup(() => {
      this.isStagnated = true;
      this.updateController();
    });
    ResultList.setup(this);
    Controller.setup();
  }

  updateController() {
    Controller.update(
      this.isRunning(),
      this.numOfPopulation,
      this.numOfGeneration,
      this.isStagnated
    );
  }

  stop() {
    clearTimeout(this.tid);
    this.tid = -1;
  }

  resume() {
    if (this.isStagnated) return;
    this.tid = window.setTimeout(() => {
      this.nextGeneration();
      this.resume();
    }, Props.intervalMillisecond);
  }

  nextGeneration() {
    // get current cells
    const currentCrowd = Board.getCrowd();
    if (currentCrowd === null) return;

    // calculate next
    const nextCrowd = currentCrowd.next();
    this.numOfPopulation = nextCrowd.getPopulation();
    this.numOfGeneration = this.numOfGeneration + 1;

    // update ui
    this.updateController();
    Board.setCrowd(nextCrowd);
    Chart.update(this.numOfGeneration, this.numOfPopulation);
    HistoryList.add(nextCrowd);
  }
})();
