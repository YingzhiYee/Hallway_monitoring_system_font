<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div id="app">
    <!-- 面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页面</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>普通用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card class="list_box">
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="query" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="queryUserList"></el-button>
        </el-input>
      </div>
      <el-table :data="userList" border stripe>
        <el-table-column label="用户名" prop="0">
        </el-table-column>
        <el-table-column label="'昵称'" prop="1">
        </el-table-column>
        <el-table-column label="住址" prop="2">
        </el-table-column>
        <el-table-column label="邮箱" prop="3">
        </el-table-column>
        <el-table-column label="出生日期" prop="4">
        </el-table-column>
        <el-table-column label="权限" prop="5">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <el-button type="primary" icon="el-icon-edit" @click="editUserInfo(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" @click="removeUser(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" >
      <span>
        <el-form :model="userInfoForm" class="userInfo_form" :rules="userInfoRules">
            <el-form-item>
              <el-input
                v-model="userInfoForm.userID"
                type="text"
                placeholder="用户ID"
                prefix-icon="el-icon-user"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item prop="userName">
              <el-input
                v-model="userInfoForm.userName"
                type="text"
                placeholder="用户昵称"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item prop="address">
              <el-input
                v-model="userInfoForm.address"
                type="text"
                placeholder="用户住址"
                prefix-icon="el-icon-house"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="userInfoForm.email"
                placeholder="用户邮箱"
                prefix-icon="el-icon-message"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="block" >
                <el-date-picker
                v-model="userInfoForm.birth"
                type="date"
                placeholder="出生日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-select v-model="userInfoForm.value" placeholder="请选择">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                </el-select>
            </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFinish">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  created () {
    this.getUserList()
  },
  data () {
    return {
      userList: [],
      total: 0,
      query: '',
      editDialogVisible: false,
      userInfoForm: {
        userID: '',
        userName: '',
        address: '',
        email: '',
        birth: '',
        value: ''
      },
      userInfoRules: {
        userName: [
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        address: [
          { min: 2, max: 10, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },
      options: [{
        value: 'Regular',
        label: '普通用户'
      }, {
        value: 'powerUser',
        label: '高级用户'
      }, {
        value: 'Admin',
        label: '管理员'
      }]
    }
  },
  methods: {
    getUserList () {
      const url = '/getUserList/' + window.localStorage.getItem('userID')
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) return this.$message.error('获取失败，请重试')
          this.$message.success('获取成功')
          this.userList = res.data
          this.total = res.data.length
          console.log(res.data.length)
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取失败，请检查链接')
        })
    },
    queryUserList () {
      const url = '/queryUserList/' + this.$data.query
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) return this.$message.error('获取失败，请重试')
          this.$message.success('获取成功')
          this.userList = res.data
          this.total = res.data.length
          console.log(res.data.length)
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('获取失败，请检查链接')
        })
    },
    editUserInfo (data) {
      this.editDialogVisible = true
      this.userInfoForm.userID = data[0]
      this.userInfoForm.userName = data[1]
      this.userInfoForm.address = data[2]
      this.userInfoForm.email = data[3]
      this.userInfoForm.birth = data[4]
      this.userInfoForm.value = data[5]
    },
    editFinish () {
      const url = '/editFinish/' + this.$data.userInfoForm.userID + '/' + this.$data.userInfoForm.userName + '/' + this.$data.userInfoForm.address + '/' + this.$data.userInfoForm.email + '/' + this.$data.userInfoForm.birth + '/' + this.$data.userInfoForm.value
      axios.get(url)
        .then((res) => {
          if (res.status !== 200) return this.$message.error('提交失败，请重试')
          this.$message.success('提交成功')
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('提交失败，请检查链接')
        })
      this.editDialogVisible = false
      this.getUserList()
    },
    removeUser (data) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = '/removeUser/' + data[0]
        axios.get(url)
          .then((res) => {
            if (res.status !== 200) return this.$message.error('删除失败，请重试')
            this.$message.success('删除成功')
          })
          .catch((error) => {
            console.log(error)
            this.$message.error('删除失败，请检查链接')
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}

</script>

<style scoped>
.list_box {
  background-color: #98c5ea;
  /*background-color:#D4E2F1*/
}
</style>
