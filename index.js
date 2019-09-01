
//////////////////////////////////////////////////
// const

const props = {
  col: 64,
  row: 64,
  interval: 100 // msec
};

const patterns = {};

const DEAD = false;
const ALIVE = true;

//////////////////////////////////////////////////
// func

const init = () => {
  createBoard();
  resumeGame();
};

const resumeGame = () => {
  setTimeout(() => {
    nextGeneration();
    resumeGame()
  }, props.interval);
};

const createBoard = () => {
  const board = getBoard();
  rangeFunc(props.row, () => createEle('tr')).map((row, rowIdx) => {
    rangeFunc(props.col, () => createEle('td')).map((blk, colIdx) => {
      setDeadOrAlive(blk, randStat() === ALIVE && randStat() == ALIVE ? ALIVE : DEAD);
      return blk;
    })
    .forEach(blk => row.appendChild(blk));
    return row;
  })
  .forEach(row => board.appendChild(row));
};

const nextGeneration = () => {
  const board = getBoard();
  const next = [];

  scanBoard((ele, rowIdx, colIdx, board) => {
      const { me, around } = getAround(board, colIdx, rowIdx);
      next.push({ ele: ele, next: nextState(me, around) });
  });
  next.forEach(({ ele, next }) => setDeadOrAlive(ele, next));
};

const nextState = (me, around) => {
  const numAlive = around.filter(c => c == ALIVE).length;
  if (me === ALIVE && (numAlive === 2 || numAlive === 3)) {
    return ALIVE; // stay life
  } else if (me === DEAD && numAlive === 3) {
    return ALIVE; // born new alive
  } else {
    return DEAD; // 多すぎ or 少なすぎ
  }
};

const getAround = (board, colIdx, rowIdx) => {
  const colIdxs = [
    colIdx === 0 ? props.col - 1 : colIdx - 1, // above
    colIdx,
    colIdx === props.col - 1 ? 0 : colIdx + 1 // below
  ];
  const rowIdxs = [
    rowIdx === 0 ? props.row - 1 : rowIdx - 1, // left
    rowIdx,
    rowIdx === props.row - 1 ? 0 : rowIdx + 1 // right
  ];

  const ret = {
    me: null,
    around: []
  };

  colIdxs.forEach((ci, colArrIdx) => {
    rowIdxs.forEach((ri, rowArrIdx) => {
      const ele = board.children[ci].children[ri]
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
  const board = getBoard();
  Array.from(board.children).forEach((row, rowIdx) =>
    Array.from(row.children).forEach((ele, colIdx) => func(ele, rowIdx, colIdx, board))
  );
}

const rangeFunc = (num, func) => {
  const arr = [];
  for (let i=0; i<num; i++) {
    arr.push(func());
  }
  return arr;
};

const createEle = (name) => document.createElement(name);

const randStat = () => Math.round(Math.random()) === 1 ? DEAD : ALIVE;

const setDeadOrAlive = (ele, state) => state === DEAD
  ? ele.classList.add('dead') 
  : ele.classList.remove('dead');

const isDeadEle = (ele) => ele.classList.contains('dead') ? DEAD : ALIVE;
const getBoard = () => document.getElementById("board");

//////////////////////////////////////////////////
// event

document.addEventListener("DOMContentLoaded", (ev) => {
  init();
});

