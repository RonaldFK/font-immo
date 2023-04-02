<template>
  <!-- <h1>dashboard</h1> -->
  <div class="main-div d-flex h-100 flex-wrap justify-center">
    <Bar
      v-if="loaded"
      ref="myChart"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: 'DashboardView',
  components: { Bar },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Biens en vente',
            backgroundColor: '#19376D',
          },
          {
            data: [],
            label: 'Biens vendus',
            backgroundColor: '#f87979',
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
      baseUrl: 'http://localhost:3000',
      month: [],
    };
  },
  created: async function () {
    await this.getMonth();
    await this.countEstate();
  },

  methods: {
    async countEstate() {
      try {
        const response = await fetch(
          `http://localhost:3000/statistics/allEstate`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
          },
        );
        const result = await response.json();
        this.chartData.datasets[0].data = result;
      } catch (err) {
        console.log(err);
      }
      this.loaded = true;
    },
    countEstateSold() {
      return [10, 20, 30, 40, 45];
    },
    async getMonth() {
      try {
        const response = await fetch(
          `http://localhost:3000/statistics/estateMonth`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
          },
        );
        const result = await response.json();
        this.chartData.labels = result;
        // this.chartData.datasets[1].data = this.countEstateSold();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
