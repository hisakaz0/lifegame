
import { DEAD, ALIVE, randState } from '../src/common';

describe('common module:', () => {
  it('DEAD is false', () => {
    expect(DEAD).toBe(false);
  });

  it('ALIVE is true', () => {
    expect(ALIVE).toBe(true);
  });

  it('randState return DEAD or ALIVE randomly', () => {
    const ret = [];
    for (let i = 0; i < 10; i += 1) {
      ret.push(randState());
    }
    expect(
      ret.filter((v) => v === ALIVE).length > 1
      && ret.filter((v) => v === DEAD).length > 1,
    ).toBe(true);
  });
});
