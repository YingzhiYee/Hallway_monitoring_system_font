<template>
  <div id="app">
    <!-- 面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页面</el-breadcrumb-item>
      <el-breadcrumb-item>监控管理</el-breadcrumb-item>
      <el-breadcrumb-item>入侵记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域、-->
    <el-card class="box-card">
      <!-- 用户列表区域 -->
      <template>
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          height= 800px
          stripe
          style="width: 100%"
          :default-sort = "{prop: 'data', order: 'descending'}"
        >
          <el-table-column
            prop="0"
            label="日期"
            sortable
            width=350px>
          </el-table-column>
          <el-table-column
            prop="1"
            label="入侵次数"
            sortable
            width=350px>
          </el-table-column>
          <el-table-column
            prop="2"
            label="入侵起始时间点"
            width=350px>
          </el-table-column>
          <el-table-column
            prop="3"
            label="入侵结束时间点"
            width=350px>
          </el-table-column>
          <el-table-column
            prop="4"
            label="详情"
            width=330px>
            <template slot-scope="scope">
              <!-- 视频按钮相关 -->
              <el-button type="text" @click="checkVideo(scope.row)">视频</el-button>
              <!-- 弹窗相关 -->
              <el-dialog
                title="详情"
                :visible.sync="dialogVisible"
                :src ="img"
                :before-close="handleClose">
<!--                <span>这是一段信息</span>-->
<!--                <img :src="img">-->
<!--                <span slot="footer" class="dialog-footer">-->
                  <img class="video-box" :src="img"><br>
<!--                  <el-button @click="dialogVisible = false">关闭视频</el-button>-->
<!--                  <el-button type="primary" class="el-button" @click="dialogVisible = false">关 闭</el-button>-->
<!--                </span>-->
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  created () {
    this.checkRecord()
  },
  data () {
    return {
      dialogVisible: false,
      video: '',
      // checkPerson: false,
      tableData: [],
      total: 0,
      // img: 'http://127.0.0.1:5000/video_feed'
      // img: require('../assets/video/video1.mp4')
      img: ''
    }
  },
  methods: {
    // 关闭弹窗，关闭视频
    handleClose (done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
      this.dialogVisible = false
      const video = document.getElementById('playVideos')
      video.remove()
    },
    checkRecord () {
      const url = '/checkRecord' // + window.localStorage.getItem('userID')
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) return this.$message.error('获取失败，请重试')
          this.$message.success('获取成功')
          this.tableData = res.data
          this.total = res.data.length
          console.log(res.data.length)
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取失败，请检查链接')
        })
    },
    // 点击按钮出现弹窗播放视频
    checkVideo (videoData) {
      const url = '/checkVideo/' + videoData[0] + '/' + videoData[2]
      // const url = '/video_feed_rec/' + videoData[0] + '/' + videoData[2]
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) return this.$message.error('获取失败，请重试')
          this.$message.success('获取成功')
          this.video = res.data
          this.total = res.data.length
          console.log(res.data.length)
          this.dialogVisible = true
          this.img = 'http://127.0.0.1:5000/video_feed_rec/' + videoData[0] + '/' + videoData[2]
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取失败，请检查链接')
          this.dialogVisible = false
        })
    }
    // objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     if (rowIndex % 3 === 0) {
    //       return {
    //         rowspan: 3, // this.$data.tableData.num,
    //         colspan: 1
    //       }
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       }
    //     }
    //   }
    // },
    // open () {
    //   this.$alert('这是一段内容', '标题名称', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //       this.$message({
    //         type: 'info',
    //         message: `action:${action}`
    //       })
    //     }
    //   })
    // },
    // chooseLocaleFile (file) {
    //   const files = document.getElementById('chooseFile').files[0]
    //   const url = window.webkitURL.createObjectURL(files)
    //   this.$refs.videoDom.src = url
    // }
  }
}
</script>

<style lang="less" scoped>
//.el-button{
//  margin-right: 20px;
//}
.el-dialog{
  width: 70%;
  height: 60%
}
.box-card {
  width: 100%;
  //height: 100%;
  //background-color:#D4E2F1
  background-color: #98c5ea;
}
.video-box{
  padding-left: 120px;
  width: 80%;
  height: 70%
}

</style>
