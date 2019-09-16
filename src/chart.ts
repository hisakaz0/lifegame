import Chart from 'chart.js';

export default new (class PopulationChart {
  private populations: Array<number>;
  private steps: Array<string>;
  private chart: Chart | null = null;

  constructor() {
    this.populations = [];
    this.steps = [];
  }

  setup() {
    this.steps.length = 0;
    this.populations.length = 0;

    if (this.chart !== null) return;

    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    if (canvas === null) return;
    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.steps,
        datasets: [
          {
            label: '# of population',
            data: this.populations,
            lineTension: 0,
          },
        ],
      },
      options: {
        animation: {
          duration: 0, // general animation time
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        responsive: false,
      },
    });
  }

  update(step: number, population: number) {
    this.steps.push(String(step));
    this.populations.push(population);
    if (this.chart !== null) {
      this.chart.update();
    }
  }
})();
