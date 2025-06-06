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
        <el-card class="lineCard">
          <div :style="{ width: '1670px', height: '840px', paddingLeft: '20px', paddingTop:'60px' }" id="lineCard"></div>
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
    this.createLineCharts()
  },
  methods: {
    createLineCharts () {
      const url = '/chartsDraw/' + 'test'
      axios.get(url)
        .then((res) => {
          const s = []
          const xData = []
          const data = res.data
          data.forEach((item) => {
            xData.push(item[0])
            s.push({
              name: item[0],
              data: item[1],
              type: 'line',
              stack: '总量'
            })
          })
          const echarts = require('echarts')
          const E = echarts.init(document.getElementById('lineCard'))
          E.setOption({
            title: {
              text: '四天入侵次数分析'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: xData
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              fontSize: 30,
              data: ['6:00-8:00', '8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00']
            },
            yAxis: {
              type: 'value'
            },
            series: s
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

.lineCard {
  width: 100%;
  height: 94%;
  background-color: #98c5ea;
  //background-color: rgb(185, 226, 244);
}

.el-container {
  height: 100%;
}
</style>
