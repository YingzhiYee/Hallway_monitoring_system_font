<template>
  <div id="app">
    <!-- 面包屑导航区-->
<!--    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
<!--  <el-menu-item index="1">处理中心</el-menu-item>-->
<!--  <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
<!--  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
<!--</el-menu>-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页面</el-breadcrumb-item>
      <el-breadcrumb-item>监控管理</el-breadcrumb-item>
      <el-breadcrumb-item>监控数据分析</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片+图片区 -->
    <el-container>
        <el-card class="radarCard">
        <div :style="{ width: '1000px', height: '900px', paddingLeft: '350px' }" id="radarCard"></div>
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
    this.createRadarCharts()
  },
  methods: {
    createRadarCharts () {
      const url = '/radarChartsDraw/' + 'test'
      axios.get(url)
        .then((res) => {
          const data = res.data
          const dataRQ = []
          const date = []
          data.forEach((item) => {
            dataRQ.push(item[1])
            date.push({
              name: item[0],
              max: 10
            })
          })
          console.log(data)
          var lineStyle = {
            normal: {
              width: 1,
              opacity: 0.5
            }
          }
          const echarts = require('echarts')
          const E = echarts.init(document.getElementById('radarCard'))
          E.setOption({
            backgroundColor: '#161627',
            title: {
              text: '近六天入侵次数雷达图',
              left: 'center',
              textStyle: {
                color: '#eee'
              }
            },
            legend: {
              bottom: 5,
              data: ['入侵次数'],
              itemGap: 20,
              textStyle: {
                color: '#fff',
                fontSize: 14
              },
              selectedMode: 'single'
            },
            radar: {
              indicator: date,
              shape: 'circle',
              splitNumber: 5,
              name: {
                textStyle: {
                  color: 'rgb(238, 197, 102)',
                  fontSize: 18
                }
              },
              splitLine: {
                lineStyle: {
                  color: [
                    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                    'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                    'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                  ].reverse()
                }
              },
              splitArea: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(238, 197, 102, 0.5)'
                }
              }
            },
            series: [
              {
                name: '入侵次数',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataRQ,
                symbol: 'none',
                itemStyle: {
                  color: '#F9713C'
                },
                areaStyle: {
                  opacity: 0.1
                }
              }
            ]
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
.radarCard{
  background-color: #161627;
  width: 100%;
  height: 95%;
}
.pieCard {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  background-color: rgb(59, 56, 56);
}

.el-container {
  height: 100%;
}
</style>
