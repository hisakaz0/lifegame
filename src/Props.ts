import Size from './Size';

export default new (class Props {
  public readonly size: Size = { x: 64, y: 64 };
  public readonly interval: number = 10;

  constructor() {}
})();
