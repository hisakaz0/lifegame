
import { DEAD, ALIVE, randState } from '../src/common';
import { createNumArray } from '../src/helper';

describe('common module:', () => {
  it('DEAD is false', () => {
    expect(DEAD).toBe(false);
  });

  it('ALIVE is true', () => {
    expect(ALIVE).toBe(true);
  });

  it('randState return DEAD or ALIVE randomly', () => {
    const ret = createNumArray(10)
      .map(() => randState());
    expect(
      ret.filter((v) => v === ALIVE).length > 1
      && ret.filter((v) => v === DEAD).length > 1,
    ).toBe(true);
  });
});
