<template>
  <div id='app'>
    第三个视频流demo，，，，让我睡觉
    <div>
      <!--
      <video :src="videoSrc" :poster="videoImg" :autoplay="playStatus" height="421" width="700" :muted="muteStatus">
        your browser does not support the video tag
      </video>
      <button @click="playClick" :class="{hide: isPlay}">点击播放</button> -->
      <!--class="video-js vjs-default-skin vjs-big-play-centered" -->
      <video    id="video"
                :preload="preload"
                :poster="videoImg" :height="height" :width="width" align="center" :controls="controls"  :autoplay="autoplay">
        <source :src="videoSrc" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
// import url from '../assets/video/video1.mp4'
export default {
  name: 'app',
  // videoSrc1: '../assets/video/video1.mp4',
  // created () {
  //   this.videoSource()
  // },
  // videoName = 'video1',
  data () {
    return {
      // videoSrc1: '../assets/video/video1.mp4',
      // videoName: '../assets/video/video1',
      // url: 'video1.mp4',
      // videoSrc: require('../assets/video/' + this.url), // ('../assets/video/video1.mp4'), // + this.videoName),
      videoSrc: require('../assets/video/video1.mp4'),
      videoImg: require('../assets/owl.png'),
      playStatus: '',
      muteStatus: '',
      isMute: true,
      isPlay: false,
      width: '1820', // 设置视频播放器的显示宽度（以像素为单位）
      height: '1020', // 设置视频播放器的显示高度（以像素为单位）
      preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      autoplay: ''
    }
  }
  // methods: {
  //   videoSource () {
  //     this.videoSrc1 = '../assets/video/' + this.videoName
  //   }
  // }

  // 自动播放属性,muted:静音播放
  // autoplay: 'muted'
}
</script>

<style scoped>

</style>
