<template>
<div>
    <!-- 面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页面</el-breadcrumb-item>
      <el-breadcrumb-item>监控管理</el-breadcrumb-item>
      <el-breadcrumb-item>区域选择</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="list_box">
      <div style="margin-top: 15px;">
      <span>请选择要进行监控的范围（两个坐标点内的矩形）</span>
        <div class="choosing" @mousemove="touchstart" @click="choosePlace">
         <canvas id="mycanvas" width="1280" height="960"></canvas>
          <img class="testPic" width="1280" height="960" src="../components/images/textPic2.jpg">
        </div>
        <div class="chooseTable">
            <el-input class="coordinate_first" v-model="x"></el-input>
            <el-input class="coordinate_second" v-model="y"></el-input>
            <el-input class="coordinate_second" v-model="first"></el-input>
            <el-input class="coordinate_second" v-model="second"></el-input>
            <el-button class="clear_second" @click="clear">清除</el-button>
            <el-button class="admitChoose" @click="admitChoose">提交</el-button>
        </div>
      </div>
    </el-card>
</div>
</template>

<script>
import axios from 'axios'
// import imgsrc from '../components/images/textPic1.jpg'
export default {
  name: 'app',
  data () {
    return {
      first: '',
      second: '',
      x: '',
      y: '',
      width: 0,
      height: 0,
      firstX: 0,
      firstY: 0,
      secondX: 0,
      secondY: 0
    }
  },
  methods: {
    touchstart (e) {
      if (e.offsetX < 1280 && e.offsetY < 960) {
        this.x = e.offsetX
        this.y = e.offsetY
      } else {
        this.x = ''
        this.y = ''
      }
    },
    choosePlace () {
      var canvas = document.getElementById('mycanvas')
      var context = canvas.getContext('2d')
      var img = new Image()
      // img.src = imgsrc
      img.src = require('../components/images/position.jpg')
      if (this.first === '') {
        this.first = '(' + this.x + ',' + this.y + ')'
        this.firstX = this.x - 0
        this.firstY = this.y - 0
        img.onload = () => {
          if (img.complete) {
            context.drawImage(img, this.firstX - 25, this.firstY - 50, 50, 50)
          }
        }
      } else if (this.first !== '' && this.second === '') {
        this.second = '(' + this.x + ',' + this.y + ')'
        this.secondX = this.x - 0
        this.secondY = this.y - 0
        img.onload = () => {
          if (img.complete) {
            context.drawImage(img, this.secondX - 25, this.secondY - 50, 50, 50)
          }
        }
      }
    },
    clear () {
      this.first = ''
      this.firstX = 0
      this.firstY = 0
      this.second = ''
      this.secondX = 0
      this.secondY = 0
      // 清空画布
      var canvas = document.getElementById('mycanvas')
      var context = canvas.getContext('2d')
      context.clearRect(0, 0, 1280, 960) // 清空
    },
    drawArea () {
      var canvas = document.getElementById('mycanvas')
      var context = canvas.getContext('2d')
      context.lineWidth = 10
      this.height = this.secondX - this.firstX
      this.width = this.secondY - this.firstY
      context.strokeStyle = 'red'
      context.strokeRect(this.firstX, this.firstY, this.height, this.width)
    },
    admitChoose () {
      this.drawArea()
      const url = '/areaChoose/' + this.$data.firstX / 2 + '/' + this.$data.firstY / 2 + '/' + this.$data.secondX / 2 + '/' + this.$data.secondY / 2
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.data !== 'ok') return this.$message.error('提交失败，请重试')
          this.$message.success('提交成功')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>

<style lang="less" scoped>
.el-input {
    margin-top: 20px;
    margin-left: 15%;
    width: 60%;
    margin-bottom: 10px;
}
.choosing {
    margin-left: 10%;
    margin-top: 30px;
}
.el-button {
    margin-left: 20px;
}
.chooseTable {
    border-radius: 30px;
    background-color: #2b4e75;
}
.list_box {
    //background-color: #6fb2ff;
  background-color: #98c5ea;
}
#mycanvas {
    position: absolute;
}
</style>
