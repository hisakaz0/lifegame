import Result from './Result';

export default new (class ResultList {
  static key = 'lifegame-results';
  private results: Array<Result> = [];

  constructor() {}

  setup() {
    const ret = localStorage.getItem(ResultList.key);
    this.results = ret === null ? [] : JSON.parse(ret);
    this.listing();
  }

  add(aResult: Result) {
    this.results.push(aResult);

    // listing
    const tbody = this.getListEle();
    if (tbody !== null) {
      tbody.appendChild(this.createOneRecordWith(aResult));
    }

    // save
    this.saveResults();
  }

  clear() {
    localStorage.setItem(ResultList.key, '');
    this.results = [];
    const tbody = this.getListEle();
    if (tbody !== null) {
      tbody.innerHTML = '';
    }
  }

  saveResults() {
    localStorage.setItem(ResultList.key, JSON.stringify(this.results));
  }

  listing(): void {
    const tbody = this.getListEle();
    if (tbody !== null) {
      this.results.forEach((res) =>
        tbody.appendChild(this.createOneRecordWith(res))
      );
    }
  }

  getListEle(): HTMLElement | null {
    const table = document.getElementById('history-of-result');
    return table === null ? null : table.getElementsByTagName('tbody')[0];
  }

  createOneRecordWith(aResult: Result) {
    const tr = document.createElement('tr');
    const createAndSet = function(text: string): HTMLElement {
      const td = document.createElement('td');
      td.textContent = text;
      return td;
    };

    [
      createAndSet(aResult.date.toString()),
      createAndSet(String(aResult.populations)),
      createAndSet(String(aResult.steps)),
    ].forEach((ele) => tr.appendChild(ele));
    return tr;
  }
})();
