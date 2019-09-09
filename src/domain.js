
import { DEAD, randState } from './common';

const initialzers = {};

initialzers.randomRect = (col, row, startPoint, endPoint) => (
  col >= startPoint.x && col <= endPoint.x && row >= startPoint.y && row <= endPoint.y
    ? randState() : DEAD
);

export default { initialzers };
