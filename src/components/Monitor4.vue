<!--<template xmlns:src="https://localhost:8081/#/monitor4">-->
<template>
  <div id="app">
<!--    监控demo4_本地视频流相关-->
<!--    <h3 class="mt-5">Live Streaming</h3>-->

<!--    <img :src="img">-->
    <!-- 面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页面</el-breadcrumb-item>
      <el-breadcrumb-item>监控管理</el-breadcrumb-item>
      <!--      <el-breadcrumb-item><a href="/null">监控管理</a></el-breadcrumb-item>-->
      <el-breadcrumb-item>实时监控</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <!-- 视频流播放 -->
<!--      <img class="video_box" :src="img">-->
    </el-card>
  </div>
</template>

<script>
// import VueVideo from '../components/VueVideo'
// import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      // videoSrc: 'http://127.0.0.1:5000/video_feed'
      // img: 'http://127.0.0.1:5000/video_feed'
      // videoUrl: '', // video显示
      // fit: 'fill' // video填充方式
    }
  },
  // 销毁监听事件
  destroyed () {
    window.removeEventListener('app', this.name)
  },
  created () {
    window.open('http://127.0.0.1:5000', '')
  }
  // methods: {
  //   Monitor4 () {
  //     const url = '/video_feed'
  //     axios.get(url)
  //       .then((res) => {
  //         console.log(res)
  //         if (res.status !== 200) return this.$message.error('获取失败，请重试')
  //         this.$message.success('获取成功')
  //         this.application_list = res.data
  //         this.total = res.data.length
  //         console.log(this.application_list)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //         this.$message.error('获取失败，请检查链接')
  //       })
  //   }
  // },
  // // components: {
  // //   VueVideo
  // // },
  // // data () {
  // //   return {
  // //     videoOptions: {
  // //       sourceType: 'video/mp4',
  // //       sourceSrc: 'rtmp://47.93.4.51:1935/live/stream'
  // //     }
  // //   }
  // // }
  // created () {
  //   this.Monitor4()
  // }
}
</script>

<style scoped>
.box-card{
  height: 95%;
  width: 100%;
  /*background-color:#D4E2F1*/
  background-color: #98c5ea;
}
.video_box{
  height: 95%;
  width: 100%;
  padding: 10px 10px 10px 10px
}
</style>
