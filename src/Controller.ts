import Board from './Board';
import Lifegame from './Lifegame';
import ResultList from './ResultList';
import Chart from './Chart';

// イベント委譲するやつ
export default new (class Controller {
  constructor() {}

  setup(
    private game: Lifegame,
    private board: Board,
    private chart: Chart,
    private resultList: ResultList
  ) {}

  onClickClearResult() {}

  onClickReset() {}

  onClickResumeOrStop() {}
})();
