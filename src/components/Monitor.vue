<template>
  <div id="app">
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
      <section class="video-box">
        <videoPlayer
          ref="videoPlayer"
          :options="videoOptions"
          class="vjs-custom-skin videoPlayer"
          :playsinline="true"
        />
      </section>
    </el-card>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
export default {
  name: 'app',
  components: {
    videoPlayer
  },
  data () {
    return {
      videoSrc: 'rtmp://47.93.4.51:1935/live/stream', // 'rtmp://58.200.131.2:1935/livetv/hunantv', // 'rtmp://47.93.4.51:1935/live/stream', // 'rtmp://58.200.131.2:1935/livetv/cctv5',
      // 视频播放
      videoOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        // muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        techOrder: ['flash', 'html5'], // 兼容顺序
        sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
          type: 'rtmp/hls',
          src: 'rtmp://47.93.4.51:1935/live/stream' // 'rtmp://58.200.131.2:1935/livetv/hunantv' // 'rtmp://47.93.4.51:1935/live/stream' // 'rtmp://58.200.131.2:1935/livetv/cctv5'
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}

.video-box {
  width: 100%;
  margin: 0 auto;
}
</style>
