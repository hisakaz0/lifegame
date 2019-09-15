
import { populationChart } from './chart'; // keep top of the file
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

const setupBoard = () => {
  createBoard({ x: props.col, y: props.row });
  new initializers.RandomRect(
    { x: props.col, y: props.row },
    { x: 10, y: 10 },
    { x: 20, y: 20 }
  ).createMap().map((e) => setState(e));

  // TODO: populationセット
  document.getElementById('population').textContent = getCountOfAlive();
};

const nextGeneration = () => {
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

  const count =  getCountOfAlive();
  const step = props.step;

  document.getElementById('population').textContent = count;
  document.getElementById('step').textContent = step;
  populationChart.update(step, count);
};

const resumeGame = () => {
  setTimeout(() => {
    nextGeneration();
    resumeGame();
  }, props.interval);
};

const init = () => {
  setupBoard();
  resumeGame();
  populationChart.setup();
};
