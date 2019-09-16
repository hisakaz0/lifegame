import Board from './Board';
import Lifegame from './Lifegame';
import ResultList from './ResultList';
import Chart from './Chart';
import Listener from './Listener';

const displayTo = function(aElement: string, withContent: string) {
  const ele = document.getElementById(aElement);
  if (ele !== null) {
    ele.textContent = withContent;
  }
};

// イベント委譲するやつ
// このクラスからは何も操作しない
export default new (class Controller {
  private onClickResetButtonListeners: Array<Listener>;
  private onClickResumeStopButtonListeners: Array<Listener>;

  constructor() {
    this.onClickResetButtonListeners = [];
    this.onClickResumeStopButtonListeners = [];
  }

  setup() {
    const resumeStopButton = document.getElementById('resume-or-stop');
    if (resumeStopButton !== null) {
      resumeStopButton.addEventListener('click', (ev) => {
        this.onClickResumeStopButtonListeners.forEach((l) => {
          l();
        });
      });
    }

    const resetButton = document.getElementById('reset');
    if (resetButton !== null) {
      resetButton.addEventListener('click', (ev) => {
        this.onClickResetButtonListeners.forEach((l) => {
          l();
        });
      });
    }
  }

  public addOnClickResetButtonListener(l: Listener) {
    this.onClickResetButtonListeners.push(l);
  }

  public addOnClickResumeStopButtonListener(l: Listener) {
    this.onClickResumeStopButtonListeners.push(l);
  }

  public update(
    isRunning: boolean,
    numOfPopulation: number,
    numOfGeneration: number
  ) {
    displayTo('num-of-population', String(numOfPopulation));
    displayTo('num-of-generation', String(numOfGeneration));

    this.setResumeStopButton(isRunning);
  }

  private setResumeStopButton(isRunning: boolean) {
    const ele = document.getElementById('resume-or-stop');
    if (ele === null) return;
    const text = isRunning ? 'Stop' : 'Resume';
    if (ele.textContent !== text) {
      ele.textContent = text;
    }
  }
})();
