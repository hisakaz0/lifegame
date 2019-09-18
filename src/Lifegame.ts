import Board from './Board';
import Chart from './Chart';
import Crowd from './Crowd';
import Props from '../lifegame.config.json';
import HistoryList from './HistoryList';
import ResultList from './ResultList';
import Controller from './Controller';
import RandomRect from './RandomRect';
import LifegameCommand from './LifegameCommand';

export default new (class Lifegame implements LifegameCommand {
  private numOfGeneration: number = 1;
  private numOfPopulation: number = 0;
  private isStagnated: boolean = false;
  private tid: number = -1;
  private crowd: Crowd;

  constructor() {
    const initializer = new RandomRect(
      Props.boardSize,
      Props.initialRandomArea.start,
      Props.initialRandomArea.end
    );
    this.crowd = initializer.generateMap();
  }

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
    Board.setCrowd(this.crowd);
    Chart.setup();
    Controller.addOnClickResetButtonListener(() => {
      this.isStagnated = false;
      this.numOfGeneration = 1;
      this.numOfPopulation = 0;
      clearTimeout(this.tid);
      this.tid = -1;
      this.updateController();
      const initializer = new RandomRect(
        Props.boardSize,
        Props.initialRandomArea.start,
        Props.initialRandomArea.end
      );
      this.crowd = initializer.generateMap();

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
    // calculate next
    const nextCrowd = this.crowd.next();
    this.numOfPopulation = nextCrowd.getPopulation();
    this.numOfGeneration = this.numOfGeneration + 1;

    // update ui
    this.updateController();
    Board.setCrowd(nextCrowd);
    Chart.update(this.numOfGeneration, this.numOfPopulation);
    HistoryList.add(nextCrowd);

    // save next as current
    this.crowd = nextCrowd;
  }
})();
