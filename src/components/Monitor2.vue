<template>
  <div id='app'>
    <div class="test" style="width:100%;height:100%;">
      <div id="button" style="width:90%;margin-left:5%;">
        <el-switch style="margin-top:3%" v-model="value1" inactive-text="下课" active-text="上课"> </el-switch>
      </div>
      <div style="width:1400px;height:1000px;float:left;margin-left:5%;margin-top:1%;">
        <canvas id="can" width="1200px" height="600px" style="background-color: #CCCCCC"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      value1: false,
      frame_url: require('../assets/testPicture/1.jpg')
    }
  },
  mounted: function () {
    this.drawfame()
  },
  watch: {
    // 监听开关的值是否改变
    value1 (value, oldvalue) {
      const _this = this
      // 计数器
      let jishu = 1
      // 图片编号
      let jishus = ''
      if (value === true) {
        _this.timer = setInterval(function () {
          // 将计数器号转换为图片编号
          // for (jishu = 1, jishu < 100, jishu=jishu+1){
          //   jishus = jishu
          //   _this.frame_url = require('../assets/testPicture/' + jishus + '.jpg')
          //   _this.drawfame()
          // }
          if (jishu < 100) {
            jishus = jishu + 1
          }
          // if (jishu < 10) {
          //   jishus = (jishu < 10 ? '0000' + jishu : jishu)
          // } else if (jishu >= 10 & jishu < 100) {
          //   jishus = ((jishu >= 10) & (jishu < 100) ? '000' + jishu : jishu)
          // } else {
          //   jishus = (jishu >= 100 ? '00' + jishu : jishu)
          // }
          // 构建下一张图片地址
          _this.frame_url = require('../assets/testPicture/' + jishus + '.jpg')
          jishu = jishu + 1
          // 重新绘制
          _this.drawfame()
        }, 1000)
      } else {
        window.clearInterval(_this.timer)
      }
    }
  },
  methods: {
    drawfame () {
      // 在Canvas画布 添加图片
      // var img = document.getElementById('fames')
      const can = document.getElementById('can')
      const cxt = can.getContext('2d')
      const img = new Image()
      img.src = this.frame_url
      img.onload = function () {
        cxt.drawImage(img, 0, 0, 1400, 1200)
        // cxt.drawImage(img, 0, 0, 500, 282)
      }
    }
  }
}
</script>

<style scoped>

</style>
