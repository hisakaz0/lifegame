
import { DEAD, ALIVE, randState } from './common';
import createNumArray from './helper';
import History from './domain/History';
import HistoryList from './domain/HistoryList';
import RandomRect from './domain/RandomRect';

const initializers = {};

initializers.RandomRect = RandomRect;

const nextState = (current, around) => around.filter((e) => e === ALIVE).length
  |> ((numAlive) => (
    current === ALIVE && (numAlive === 2 || numAlive === 3)
  ) || (
    current === DEAD && numAlive === 3
  ));


const lifegameHistory = new HistoryList();
export {
  initializers, nextState, lifegameHistory, History,
};
