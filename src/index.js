
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
  props.step = 1;
  document.getElementById('population').textContent = getCountOfAlive();
  document.getElementById('step').textContent = props.step;
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
  props.tid = setTimeout(() => {
    nextGeneration();
    resumeGame();
  }, props.interval);
};

const setupButtons = () => {
  document.getElementById('reset').addEventListener('click', (ev) => {
    clearTimeout(props.tid);
    props.tid = undefined;
    document.getElementById('resume-or-stop').textContent = "Start";
    getBoardEle().innerHTML = "";
    setupBoard();
    populationChart.reset();
  });
  document.getElementById('resume-or-stop').addEventListener('click', (ev) => {
    if (props.tid === undefined) {
      // stop -> resume
      resumeGame();
      ev.target.textContent = "Stop";
    } else {
      // resume -> stop
      clearTimeout(props.tid);
      props.tid = undefined;
      ev.target.textContent = "Resume";
    }
  });
};

const init = () => {
  setupBoard();
  setupButtons();
  populationChart.setup();

  resumeGame();
};
