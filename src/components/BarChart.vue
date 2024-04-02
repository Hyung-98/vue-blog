<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarChart",
  components: { Bar },
  computed: {
    chartData() { 
      return {
        labels: ['January', 'February', 'March'],
        datasets: [ { data: [40, 20, 12] } ],
      };
    },
    chartOptions() {
      return {
        responsive: true
      }
    },
  },
};
</script>
<style>
</style>