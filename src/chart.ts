
import Chart from 'chart.js';
import { } from './proto';

const populationChart = new class PopulationChart {
  constructor() {
    this.populations = [];
    this.steps = [];
  }

  setup() {
    const ctx = document.getElementById('chart').getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.steps,
        datasets: [{
          label: '# of population',
          data: this.populations,
          lineTension: 0,
        }],
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

  update(step, population) {
    this.steps.push(step);
    this.populations.push(population);
    this.chart.update();
  }

  reset() {
    this.steps.clear();
    this.populations.clear();
    this.chart.update();
  }
}();

export default populationChart;
