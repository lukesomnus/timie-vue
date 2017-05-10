<template>
  <div class="pie-chart"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: 'pieChart',
    props: ['data', 'title'],
    mounted() {
      this.init()
    },
    methods: {
      init() {
        var myChart = echarts.init(this.$el);
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: this.title,
            // subtext: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          // legend: {
          //   orient: 'vertical',
          //   left: 'left',
          //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          // },
          series: [{
            name: this.title,
            type: 'pie',
            radius: '60%',
            center: ['50%', '60%'],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        myChart.setOption(option, true);
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
