import Size from './Size';

export default new (class Props {
  public readonly size: Size = { x: 100, y: 100 };
  public readonly interval: number = 50;

  constructor() {}
})();
