
export default class History {
  constructor(cells) {
    this.cells = cells;
  }

  isEqual(aHistory) {
    return this.cells
      .map((c1) => aHistory.cells
        .find((c2) => c1.x === c2.x
          && c1.y === c2.y
          && c1.state === c2.state))
      .filter((v) => v !== undefined)
      .length === this.cells.length;
  }
}

