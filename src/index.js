
import { ALIVE, DEAD, randState } from './common';
import {
  createEle, getBoardEle, isDeadEle, setStateEle,
} from './infra';

// ////////////////////////////////////////////////
// const

const props = {
  col: 64,
  row: 64,
  interval: 100, // msec
  step: 0,
};

// ////////////////////////////////////////////////
// event

document.addEventListener('DOMContentLoaded', () => {
  init();
});

// ////////////////////////////////////////////////
// func

const createBoard = () => { // TODO: ボード生成と初期値計算、html反映を別の処理に分ける
  const board = getBoardEle();
  rangeFunc(props.row, () => createEle('div')).map((row, rowIdx) => {
    row.classList.add('row');
    rangeFunc(props.col, () => createEle('div')).map((blk, colIdx) => {
      initializer(blk, colIdx, rowIdx);
      blk.classList.add('blk');
      return blk;
    })
      .forEach((blk) => row.appendChild(blk));
    return row;
  })
    .forEach((row) => board.appendChild(row));

  // TODO: populationセット
};

const initializer = (blk, colIdx, rowIdx) => {
  if (colIdx > 10 && colIdx < 30 && rowIdx > 10 && rowIdx < 30) {
    setStateEle(blk, randState() === ALIVE && randState() === ALIVE ? ALIVE : DEAD);
  } else {
    setStateEle(blk, DEAD);
  }
};

const nextGeneration = () => { // TODO: next計算とhtml反映を別の処理に分ける
  const nextArr = [];
  props.step += 1;

  scanBoard((ele, rowIdx, colIdx, board) => {
    const { me, around } = getAround(board, colIdx, rowIdx);
    nextArr.push({ ele, next: nextState(me, around) });
  });
  nextArr.forEach(({ ele, next }) => setStateEle(ele, next));
  const population = nextArr.filter(({ ele, next }) => next === ALIVE).length;

  document.getElementById('population').textContent = population;
  document.getElementById('step').textContent = props.step;
};

const resumeGame = () => {
  setTimeout(() => {
    nextGeneration();
    resumeGame();
  }, props.interval);
};

const nextState = (me, around) => {
  const numAlive = around.filter((c) => c === ALIVE).length;
  if (me === ALIVE && (numAlive === 2 || numAlive === 3)) {
    return ALIVE; // stay life
  } if (me === DEAD && numAlive === 3) {
    return ALIVE; // born new alive
  }
  return DEAD; // 多すぎ or 少なすぎ
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

const scanBoard = (func) => {
  const board = getBoardEle();
  Array.from(board.children)
    .forEach((row, rowIdx) => (
      Array.from(row.children)
        .forEach((ele, colIdx) => func(ele, rowIdx, colIdx, board))
    ));
};

const rangeFunc = (num, func) => {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push(func());
  }
  return arr;
};

const init = () => {
  createBoard();
  resumeGame();
};
