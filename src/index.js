
import { populationChart } from './chart'; // keep top of the file
import { ALIVE, DEAD, randState } from './common';
import {
  createEle, getBoardEle, isDeadEle, setStateEle,
  getAroundEles, getBoardState, getCountOfAlive,
  createBoard, setState, resultList
} from './infra';
import {
  initializers, nextState, lifegameHistory
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
    .let((states) => {
      lifegameHistory.add(states);
      return states;
    })
    .map((state) => ({
      current: state,
      neighbors: getAroundEles(state),
    }))
    .map(({ current, neighbors }) => ({
      ...current,
      state: nextState(current.state, neighbors)
    }))
    .map((arg) => setState(arg));

  const count = getCountOfAlive();
  const step = props.step;

  document.getElementById('population').textContent = count;
  document.getElementById('step').textContent = step;
  populationChart.update(step, count);
};

const resumeGame = () => {
  if (props.isStagnated) return;
  props.tid = setTimeout(() => {
    nextGeneration();
    resumeGame();
  }, props.interval);
};

// セルの状態が動かなくなったとき
const onStagnatedListener = () => {
  props.isStagnated = true;
  saveResult();
  document.getElementById('end-of-game').classList.remove('is-invisible');
};

const saveResult = () => {
  resultList.add({
    date: new Date(),
    populations: getCountOfAlive(),
    steps: props.step
  });
};

const setupButtons = () => {
  document.getElementById('reset').addEventListener('click', (ev) => {
    clearTimeout(props.tid);
    props.tid = undefined;
    document.getElementById('resume-or-stop').textContent = "Start";
    getBoardEle().innerHTML = "";
    setupBoard();
    populationChart.reset();
    props.isStagnated = false;
    document.getElementById('end-of-game').classList.add('is-invisible');
  });
  document.getElementById('resume-or-stop').addEventListener('click', (ev) => {
    if (props.tid === undefined) {
      // stop -> resume
      resumeGame();
      ev.target.textContent = "Stop";
    } else {
      // resume -> stop
      stopGame();
    }
  });
  document.getElementById('save-result').addEventListener('click', (ev) => {
    saveResult();
  });
  document.getElementById('clear-result').addEventListener('click', (ev) => {
    resultList.clear();
  });
};
const stopGame = () => {
  clearTimeout(props.tid);
  props.tid = undefined;
  document.getElementById('resume-or-stop').textContent = "Resume";
}

const init = () => {
  setupBoard();
  setupButtons();
  populationChart.setup();
  resultList.setup();
  lifegameHistory.setup(onStagnatedListener);

  resumeGame();
};
