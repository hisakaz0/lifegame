
const ALIVE = true;
const DEAD = false;

const randState = () => Math.round(Math.random()) === 1 ? DEAD : ALIVE;

export { ALIVE, DEAD, randState };
