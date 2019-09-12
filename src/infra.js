
import { DEAD, ALIVE } from './common';
import { createNumArray } from './helper';
import { _ } from './proto';

const DEAD_CLASS = 'dead';

const createEle = (name) => document.createElement(name);
const getBoardEle = () => document.getElementById('board');
const isDeadEle = (ele) => ele.classList.contains(DEAD_CLASS);

const setStateEle = (ele, state) => ((state === DEAD)
  ? ele.addClass(DEAD_CLASS)
  : ele.removeClass(DEAD_CLASS));

const createBoard = ({ x, y }) => createNumArray(y)
  .map(() => createEle('div').addClass('row'))
  .map((row) => createNumArray(x)
    .map(() => createEle('div').addClass('blk'))
    .map((blk) => row.appendChild(blk))
    .let(() => row)
  ).map((row) => getBoardEle().appendChild(row));

const getAroundEles = (pos, size) => {
  const xArr = [
    pos.x === 0 ? size.x - 1 : pos.x - 1,
    pos.x,
    pos.x === size.x - 1 ? 0 : pos.x + 1
  ];
  const yArr = [
    pos.y === 0 ? size.y - 1 : pox.y - 1,
    pos.y,
    pos.y === size.y - 1 ? 0 : pos.y + 1
  ];
  return xArr.map((x) =>
    yArr.map((y) => [x, y])
  ).flat()
  .map(([x, y]) => getBoardEle().getBoardEle(x, y).isAiveEle());
};

export {
  createEle, getBoardEle, isDeadEle, setStateEle,
  createBoard,
};
