
import { _ } from '../src/proto';

describe('proto module:', () => {
  describe('Object#let:', () => {
    it('[].let(arr => arr.length === 0)', () => {
      const obj = [];
      obj.let((arr) => {
        expect(arr.length).toBe(0);
      });
    });

    it('3.let(num => num === 3)', () => {
      const n = 3;
      n.let((num) => {
        expect(num).toEqual(3);
      });
    });
  });

  describe('HTMLElement#addClass:', () => {
    it("return this when 'class' is fed", () => {
      const e = document.createElement('div');
      expect(e.addClass('class')).toBe(e);
    });

    it("classList contains 'class' when 'class' is fed", () => {
      const e = document.createElement('div');
      expect(e.addClass('class')
        .classList.contains('class')).toEqual(true);
    });
  });

  describe('HTMLElement#removeClass:', () => {
    it("return this when 'class' is fed", () => {
      const e = document.createElement('div');
      expect(e.removeClass('class')).toBe(e);
    });

    it("classList does not contains 'class' when 'class' is fed", () => {
      const e = document.createElement('div');
      expect(e
        .addClass('class')
        .removeClass('class')
        .classList.contains('class')).toBe(false);
    });
  });
});
