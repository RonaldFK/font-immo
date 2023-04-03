<template>
  <div class="main-div d-flex h-100 flex-wrap justify-center">
    <Bar
      class="card-estate ma-5 pa-5 rounded d-flex flex-column h-100 flex-wrap justify-center"
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
            label: 'Biens rentrés',
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
      initMonth: [
        { label: 'Janvier', num_month: 1 },
        { label: 'Février', num_month: 2 },
        { label: 'Mars', num_month: 3 },
        { label: 'Avril', num_month: 4 },
        { label: 'Mai', num_month: 5 },
        { label: 'Juin', num_month: 6 },
        { label: 'Juillet', num_month: 7 },
        { label: 'Août', num_month: 8 },
        { label: 'Septembre', num_month: 9 },
        { label: 'Octobre', num_month: 10 },
        { label: 'Novembre', num_month: 11 },
        { label: 'Décembre', num_month: 12 },
      ],
    };
  },
  created: async function () {
    if (!this?.$cookies?.get('token')) {
      this.$router.push('/signin');
    }
    await this.getMonth();
    await this.countEstate();
    await this.countEstateSold();
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
    },
    async countEstateSold() {
      try {
        const response = await fetch(
          `http://localhost:3000/statistics/estateSold`,
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
        this.chartData.datasets[1].data = result;
      } catch (err) {
        console.log(err);
      }
      this.loaded = true;
    },
    async getMonth() {
      const object = [];
      this.initMonth.map((elem) => {
        object.push(elem.label);
      });
      this.chartData.labels = object;
    },
  },
};
</script>
