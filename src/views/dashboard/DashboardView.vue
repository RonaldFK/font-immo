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

<script src="./dashboard.view.js"></script>
