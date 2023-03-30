<template>
  <!-- <h1>dashboard</h1> -->
  <div class="main-div d-flex h-100 flex-wrap justify-center">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
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
      chartData: {
        labels: [],
        datasets: [
          {
            data: this.countEstate(),
            label: 'Biens en vente',
            backgroundColor: '#19376D',
          },
          {
            data: this.countEstateSold(),
            label: 'Biens vendus',
            backgroundColor: '#f87979',
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
      baseUrl: 'http://localhost:3000',
      estates: 0,
    };
  },
  // created: async function () {
  //   {
  //     // if (!this.$cookies.get('token')) {
  //     //   return this.$router.push('/signin');
  //     // }
  //     try {
  //       const response = await fetch(`${this.baseUrl}/estate`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Access-Control-Allow-Origin': 'http://localhost:8080',
  //           Authorization: `Bearer ${this.$cookies.get('token')}`,
  //         },
  //       });
  //       const result = await response.json();
  //       this.estates = result.length;
  //       this.chartData.datasets[0].data = [5, 5];

  //       // console.log(test.length);
  //       // console.log(this.chartData.datasets[0].data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // },
  created: async function () {
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
      // this.chartData.labels = result;
      this.$set(this.chartData, 'labels', result);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    countEstate() {
      return [15, 25, 35, 45, 50];
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
        this.chartData.labels = JSON.stringify(result);
        // console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
