<template>
<div>
    <!-- 面包屑导航区-->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">主页面</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="list_box">
      <div style="margin-top: 15px;">
      </div>
      <el-table :data="application_list" border stripe>
        <el-table-column label="用户名" prop="0">
        </el-table-column>
        <el-table-column label="申请权限" prop="1">
        </el-table-column>
        <el-table-column label="申请原因" prop="2">
        </el-table-column>
        <el-table-column label="申请时间" prop="3"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="同意" placement="top">
              <el-button type="primary" icon="el-icon-circle-check" @click="grantApplication(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="否决" placement="top">
              <el-button type="info" icon="el-icon-circle-close" @click="rejectApplication(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      application_list: [],
      total: 0
    }
  },
  methods: {
    listApplicationList () {
      const url = '/getApplicationList/' + window.localStorage.getItem('userID')
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) return this.$message.error('获取失败，请重试')
          this.$message.success('获取成功')
          this.application_list = res.data
          this.total = res.data.length
          console.log(this.application_list)
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取失败，请检查链接')
        })
    },
    grantApplication (data) {
      const url = '/grantApplication/' + data[0] + '/' + data[3]
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) return this.$message.error('提交失败，请重试')
          this.$message.success('提交成功')
          this.listApplicationList()
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('提交失败，请检查链接')
        })
      // this.listApplicationList()
    },
    rejectApplication (data) {
      const url = '/rejectApplication/' + data[0] + '/' + data[3]
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) return this.$message.error('提交失败，请重试')
          this.$message.success('提交成功')
          this.listApplicationList()
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('提交失败，请检查链接')
        })
      // this.listApplicationList()
    }
  },
  created () {
    this.listApplicationList()
  }
}
</script>

<style lang="less" scoped>
.list_box {
  background-color: #98c5ea;
}
</style>
