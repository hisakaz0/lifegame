
import { createEle } from '../src/infra';

describe("infra module:", () => {
  describe("createEle:", () => {
    it("return HTMLElement when 'div' is fed", () => {
      expect(createEle('div') instanceof HTMLElement).toBe(true);
    });

    it("return HTMLElement when 'p' is fed", () => {
      expect(createEle('p') instanceof HTMLElement).toBe(true);
    });
  });
});
