
import { DEAD, ALIVE } from './common';

const createEle = (name) => document.createElement(name);
const getBoardEle = () => document.getElementById('board');
const isDeadEle = (ele) => (ele.classList.contains('dead') ? DEAD : ALIVE);

const setStateEle = (ele, state) => (state === DEAD
  ? ele.classList.add('dead')
  : ele.classList.remove('dead'));

export {
  createEle, getBoardEle, isDeadEle, setStateEle,
};
