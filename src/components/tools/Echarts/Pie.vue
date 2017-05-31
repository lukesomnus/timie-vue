<template>
  <div class="pie-chart">
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'pieChart',
  props: ['option'],
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var myChart = echarts.init(this.$el);
      myChart.setOption(this.option, true);
    }
  },
  watch: {
    data(newVal, oldVal) {
      this.init()
    }
  }
}

</script>
<style scoped>
.pie-chart {
  width: 600px;
  height: 400px;
  margin: 0 auto;
}
</style>
