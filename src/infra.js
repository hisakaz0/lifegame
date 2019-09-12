
import { DEAD, ALIVE } from './common';
import { createNumArray } from './helper';
import { _ } from './proto';

const DEAD_CLASS = 'dead';

const createEle = (name) => document.createElement(name);
const getBoardEle = () => document.getElementById('board');
const isDeadEle = (ele) => ele.classList.contains(DEAD_CLASS);

const setStateEle = (ele, state) => (state === DEAD)
  ? ele.addClass(DEAD_CLASS)
  : ele.removeClass(DEAD_CLASS);

const createBoard = ({x, y}) =>
  createNumArray(y)
    .map(() => createEle('div').addClass('row'))
    .map((row) =>
      createNumArray(x)
        .map(() => createEle('div').addClass('blk'))
        .map((blk) => row.appendChild(blk))
        .let(() => row)
    ).map((row) => getBoardEle().appendChild(row));

export {
  createEle, getBoardEle, isDeadEle, setStateEle,
  createBoard
};
