
import { ALIVE, DEAD, randState } from './common';
import {
  createEle, getBoardEle, isDeadEle, setStateEle,
  getAroundEles, getBoardState, getCountOfAlive,
  createBoard, setState
} from './infra';
import {
  initializers, nextState
} from './domain';

// ////////////////////////////////////////////////
// const

const props = {
  col: 64,
  row: 64,
  interval: 10, // msec
  step: 0,
};

// ////////////////////////////////////////////////
// event

document.addEventListener('DOMContentLoaded', () => {
  init();
});

// ////////////////////////////////////////////////
// func

const setupBoard = () => { // TODO: ボード生成と初期値計算、html反映を別の処理に分ける
  createBoard({ x: props.col, y: props.row });
  new initializers.RandomRect(
    { x: props.col, y: props.row },
    { x: 10, y: 10 },
    { x: 20, y: 20 }
  ).createMap().map((e) => setState(e));

  // TODO: populationセット
  document.getElementById('population').textContent = getCountOfAlive();
};

const nextGeneration = () => { // TODO: next計算とhtml反映を別の処理に分ける
  const nextArr = [];
  props.step += 1;

  getBoardState()
    .map((state) => ({
      current: state,
      neighbors: getAroundEles(state),
    }))
    .map(({ current, neighbors }) => ({
      ...current,
      state: nextState(current.state, neighbors)
    }))
    .map((arg) => setState(arg));

  document.getElementById('population').textContent = getCountOfAlive();
  document.getElementById('step').textContent = props.step;
};

const resumeGame = () => {
  setTimeout(() => {
    nextGeneration();
    resumeGame();
  }, props.interval);
};

const getAround = (board, colIdx, rowIdx) => {
  const colIdxs = [
    colIdx === 0 ? props.col - 1 : colIdx - 1, // above
    colIdx,
    colIdx === props.col - 1 ? 0 : colIdx + 1, // below
  ];
  const rowIdxs = [
    rowIdx === 0 ? props.row - 1 : rowIdx - 1, // left
    rowIdx,
    rowIdx === props.row - 1 ? 0 : rowIdx + 1, // right
  ];

  const ret = {
    me: null,
    around: [],
  };

  rowIdxs.forEach((ri, rowArrIdx) => {
    colIdxs.forEach((ci, colArrIdx) => {
      const ele = board.children[ri].children[ci];
      if (colArrIdx === 1 && rowArrIdx === 1) {
        ret.me = isDeadEle(ele);
      } else {
        ret.around.push(isDeadEle(ele));
      }
    });
  });

  return ret;
};

const init = () => {
  setupBoard();
  resumeGame();
};
