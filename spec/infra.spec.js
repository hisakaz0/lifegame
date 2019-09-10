
import {
  createEle, getBoardEle, setStateEle,
  isDeadEle
} from '../src/infra';
import { DEAD, ALIVE } from '../src/common';

describe("infra module:", () => {
  describe("createEle:", () => {
    it("return HTMLElement when 'div' is fed", () => {
      expect(createEle('div') instanceof HTMLElement).toBe(true);
    });

    it("return HTMLElement when 'p' is fed", () => {
      expect(createEle('p') instanceof HTMLElement).toBe(true);
    });
  });

  describe("getBoardEle:", () => {
    beforeEach(() => {
      document.body.innerHTML = __html__['index.html'];
    });

    it("return board ele when is called", () => {
      expect(getBoardEle()).toBeDefined();
    });
  });

  describe("setStateEle:", () => {
    beforeEach(() => {
      document.body.innerHTML = __html__['index.html'];
    });

    it("classList contains 'dead' when DEAD is fed", () => {
      const e = getBoardEle();
      setStateEle(e, DEAD);
      expect(e.classList.contains('dead')).toBe(true);
    });

    it("classList does not contains 'dead' when ALIVE is fed", () => {
      const e = getBoardEle();
      setStateEle(e, ALIVE);
      expect(e.classList.contains('dead')).toBe(false);
    });

    it("return this when called", () => {
      getBoardEle().let(ele => expect(setStateEle(ele, ALIVE)).toBe(ele));
    });
  });

  describe("isDeadEle:", () => {
    beforeEach(() => {
      document.body.innerHTML = __html__['index.html'];
    });

    it("return true if classList contains 'dead'", () => {
      expect(getBoardEle()
        .let((ele) => setStateEle(ele, DEAD))
        .let((ele) => isDeadEle(ele))).toBe(true);
    });

    it("return false if classList does not contains 'dead'", () => {
      expect(getBoardEle()
        .let((ele) => setStateEle(ele, ALIVE))
        .let((ele) => isDeadEle(ele))).toBe(false);
    });
  });

});
