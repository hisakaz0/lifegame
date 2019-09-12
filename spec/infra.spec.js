
import {
  createEle, getBoardEle, setStateEle,
  isDeadEle, createBoard
} from '../src/infra';
import { DEAD, ALIVE } from '../src/common';

describe("infra module:", () => {

  const setHtml = () => {
    document.body.innerHTML = __html__['index.html'];
  }

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

  describe("createBoard", () => {
    beforeEach(() => setHtml());

    const getRowSize = (size) =>
      Array.from(getBoardEle().children).length
    ;

    const getRowSizeHasClass = (size) =>
      Array.from(getBoardEle().children)
        .filter((row) => row.classList.contains('row'))
        .length
    ;

    const getRowSizeHasValidBlk = (size) =>
      Array.from(getBoardEle().children)
        .filter((row) => Array.from(row.children)
          .filter(
            (blk) => blk.classList.contains('blk')
          ).length === size.x
        ).length
    ;

    it("32x32 board is created when '{ x: 32, y: 32 }' is fed", () => {
      const size = { x: 32, y: 32 };
      createBoard(size);
      expect(getRowSize(size)).toBe(size.y);
      expect(getRowSizeHasClass(size)).toBe(size.y);
      expect(getRowSizeHasValidBlk(size)).toBe(size.y);
    });

    it("16x15 board is created when '{ x: 16, y: 15 }' is fed", () => {
      const size = { x: 16, y: 15 };
      createBoard(size);
      expect(getRowSize(size)).toBe(size.y);
      expect(getRowSizeHasClass(size)).toBe(size.y);
      expect(getRowSizeHasValidBlk(size)).toBe(size.y);
    });
  });
});
