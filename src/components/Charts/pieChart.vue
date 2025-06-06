<template>
  <div id="app">
    <!-- 面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页面</el-breadcrumb-item>
      <el-breadcrumb-item>监控管理</el-breadcrumb-item>
      <el-breadcrumb-item>监控数据分析</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片+图片区 -->
    <el-container>
        <el-card class="pieCard">
          <div :style="{ width: '1680px', height: '840px', paddingLeft: '80px',paddingTop:'50px' }" id="pieCard"></div>
        </el-card>
    </el-container>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    // this.getInfo()
  },
  mounted () {
    this.createPieCharts()
  },
  methods: {
    createPieCharts () {
      const url = '/pieChartsDraw/' + 'test'
      axios.get(url)
        .then((res) => {
          const data = res.data
          const s = []
          const xData = []
          data.forEach((item) => {
            xData.push(item[0])
            s.push({
              name: item[0],
              value: item[1]
            })
            const echarts = require('echarts')
            const E = echarts.init(document.getElementById('pieCard'))
            E.setOption({
              title: {
                text: '近五天入侵时长比较',
                radius: '55%',
                center: ['50%', '50%'],
                textStyle: {
                  color: '#ccc'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                  colorLightness: [0, 1]
                }
              },
              series: [
                {
                  name: '日期',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '50%'],
                  data: s.sort(function (a, b) { return a.value - b.value }),
                  roseType: 'radius',
                  label: {
                    fontSize: 30,
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  labelLine: {
                    lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  },
                  itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  },
                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                    return Math.random() * 200
                  }
                }
              ]
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>

.pieCard {
  width: 100%;
  height: 90%;
  margin-bottom: 20px;
  background-color: rgb(59, 56, 56);
}

.el-container {
  height: 100%;
}
</style>
