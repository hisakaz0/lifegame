
import {
  createEle, getBoardEle, setStateEle,
  isDeadEle, createBoard, getCountOfAlive,
  setState, getState, isAliveEle, getBoardState,
  getAroundEles
} from '../src/infra';
import { DEAD, ALIVE } from '../src/common';

describe('infra module:', () => {
  const setHtml = () => {
    document.body.innerHTML = __html__['index.html'];
  };

  describe('createEle:', () => {
    it("return HTMLElement when 'div' is fed", () => {
      expect(createEle('div') instanceof HTMLElement).toBe(true);
    });

    it("return HTMLElement when 'p' is fed", () => {
      expect(createEle('p') instanceof HTMLElement).toBe(true);
    });
  });

  describe('getBoardEle:', () => {
    beforeEach(() => {
      document.body.innerHTML = __html__['index.html'];
    });

    it('return board ele when is called', () => {
      expect(getBoardEle()).toBeDefined();
    });
  });

  describe('setStateEle:', () => {
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

    it('return this when called', () => {
      getBoardEle().let((ele) => expect(setStateEle(ele, ALIVE)).toBe(ele));
    });
  });

  describe('isDeadEle:', () => {
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

  describe('isAlive:', () => {
    beforeEach(() => setHtml());

    it("return false if classList contains 'dead'", () => {
      const ele = getBoardEle();
      setStateEle(ele, DEAD);
      expect(isAliveEle(ele)).toBe(false);
    });

    it("return true is classList does not contain 'dead'", () => {
      const ele = getBoardEle();
      setStateEle(ele, ALIVE);
      expect(isAliveEle(ele)).toBe(true);
    });
  });

  describe('createBoard:', () => {
    beforeEach(() => setHtml());

    const getRowSize = (size) => Array.from(getBoardEle().children).length;
    const getRowSizeHasClass = (size) => Array.from(getBoardEle().children)
      .filter((row) => row.classList.contains('row'))
      .length;
    const getRowSizeHasValidBlk = (size) => Array.from(getBoardEle().children)
      .filter((row) => Array.from(row.children)
        .filter(
          (blk) => blk.classList.contains('blk'),
        ).length === size.x).length;

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

  describe('setState:', () => {
    beforeEach(() => {
      setHtml();
      createBoard({ x: 15, y: 15 });
    });

    it("throw no error when called.", (done) => {
      setState({ x: 1, y: 1, state: DEAD });
      done();
    });

    it("the element has 'dead'", () => {
      setState({ x: 1, y: 1, state: DEAD });
      const ret = getState({ x: 1, y: 1 });
      expect(ret).toBe(DEAD);
    });

    it("the element does not have 'dead'", () => {
      const p = { x: 1, y: 1 };
      setState({ ...p, state: ALIVE });
      const ret = getState(p);
      expect(ret).toBe(ALIVE);
    });
  });

  describe('getCountOfAlive:', () => {
    beforeEach(() => {
      setHtml();
      createBoard({ x: 15, y: 15 });
    });

    it('return 15*15 when called after init', () => {
      expect(getCountOfAlive()).toBe(15 * 15);
    });

    it('return 15*15 - 1 when called setState(DEAD), this in order', () => {
      setState({ x: 2, y: 3, state: DEAD });
      expect(getCountOfAlive()).toBe(15* 15 - 1);
    });
  });

  describe('getBoardState:', () => {
    beforeEach(() => {
      setHtml();
      createBoard({ x: 15, y: 15 });
    });

    it("return states which are alive when called", () => {
      const ret = getBoardState();
      expect(ret.length).toBe(15 * 15);
      ret.filter(({ state }) => state === ALIVE)
        .length
      |> expect
      |> ((m) => m.toBe(15* 15));
    });

    it("return states which has one dead when called setState(DEAD), this in order", () => {
      setState({ x: 5, y: 7, state: DEAD });
      const ret = getBoardState();
      ret.filter(({ state }) => state === ALIVE)
        .length
      |> expect
      |> ((m) => m.toBe(15 * 15 -1));
      ret.find(({ x, y}) => x === 5 && y === 7)
        .state === DEAD
      |> expect
      |> ((m) => m.toBe(true));
    });
  });

  describe('getAroundEles:', () => {

    beforeEach(() => {
      setHtml();
      createBoard({ x: 15, y: 15 });
    });

    it("return arr length is 8 return is called", () => {
      const pos = { x: 1, y: 1 };
      expect(getAroundEles(pos).length).toBe(8);
      expect(getAroundEles(pos)
        .filter((v) => v === ALIVE)
        .length
      ).toBe(8);
    });

    it("return arr length is 7 return setState(DEAD), this is called in order", () => {
      setState({ x: 14, y: 14, state: DEAD });
      expect(getAroundEles({ x: 0, y: 0 })
        .filter((v) => v === ALIVE)
        .length
      ).toBe(7);
    });
  });
});
