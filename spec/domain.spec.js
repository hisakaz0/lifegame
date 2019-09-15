
import { initializers, nextState, History } from '../src/domain';
import createNumArray from '../src/helper';
import { DEAD, ALIVE } from '../src/common';

describe('domain module:', () => {
  describe('randomRect initializer:', () => {
    it('outside of rect is DEAD', () => {
      const size = { x: 60, y: 60 };
      const start = { x: 10, y: 10 };
      const end = { x: 20, y: 20 };
      const randomRect = new initializers.RandomRect(size, start, end);
      expect(randomRect.get({ x: 33, y: 33 })).toBe(DEAD);
      expect(randomRect.get({ x: 22, y: 22 })).toBe(DEAD);
      expect(randomRect.get({ x: 21, y: 21 })).toBe(DEAD);
      expect(randomRect.get({ x: 9, y: 9 })).toBe(DEAD);
    });

    it('inside of rect is DEAD or ALIVE randomly', () => {
      const size = { x: 30, y: 30 };
      const start = { x: 5, y: 5 };
      const end = { x: 10, y: 10 };
      const randomRect = new initializers.RandomRect(size, start, end);
      const numAlive = createNumArray(16)
        .filter(() => randomRect.get({ x: 6, y: 6 }))
        .length;
      expect(numAlive).toBeGreaterThan(1);
    });
  });

  describe('nextState:', () => {
    const test = (current, numAlive, expectedValue) => (
      nextState(current, Array(numAlive).fill(ALIVE))
        |> expect
        |> ((m) => m.toBe(expectedValue))
    );

    it('return ALIVE when current is ALIVE and around has 3 alive cell', () => {
      test(ALIVE, 3, ALIVE);
    });

    it('return ALIVE when current is ALIVE and around has 2 alive cell', () => {
      test(ALIVE, 2, ALIVE);
    });

    it('return ALIVE when current is DEAD and around has 3 alive cell', () => {
      test(DEAD, 3, ALIVE);
    });

    it('return DEAD when current is DEAD and around has 2 alive cell', () => {
      test(DEAD, 2, DEAD);
    });

    it('return DEAD when current is DEAD and around has 4 alive cell', () => {
      test(DEAD, 4, DEAD);
    });

    it('return DEAD when current is ALIVE and around has 1 alive cell', () => {
      test(ALIVE, 1, DEAD);
    });

    it('return DEAD when current is ALIVE and around has 4 alive cell', () => {
      test(ALIVE, 4, DEAD);
    });
  });

  describe('History class:', () => {
    const g = (x, y, state) => ({ x, y, state });
    const arg1 = [g(0, 0, ALIVE), g(0, 1, ALIVE), g(1, 0, DEAD), g(1, 1, ALIVE)];
    const arg2 = [g(0, 0, DEAD), g(0, 1, DEAD), g(1, 0, ALIVE), g(1, 1, ALIVE)];
    const arg3 = [g(0, 0, ALIVE), g(0, 1, ALIVE), g(1, 0, DEAD), g(1, 1, DEAD)];
    const h = new History(arg1);

    it('return true when isEqual is called with a same object', () => {
      expect(h.isEqual(h)).toBe(true);
    });

    it('return false when isEqual is called with a three differ', () => {
      const h2 = new History(arg2);
      expect(h.isEqual(h2)).toBe(false);
    });

    it('return false when isEqual is called with a one differ', () => {
      const h3 = new History(arg3);
      expect(h.isEqual(h3)).toBe(false);
    });
  });
});
