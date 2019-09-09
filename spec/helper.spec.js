
import { createNumArray } from '../src/helper';

describe('helper module:', () => {
  describe('createNumArray:', () => {
    it('return [0,1,2] when 3 is fed', () => {
      expect(createNumArray(3)).toEqual([0, 1, 2]);
    });

    it('return [0] when 1 is fed', () => {
      expect(createNumArray(1)).toEqual([0]);
    });
  });
});
