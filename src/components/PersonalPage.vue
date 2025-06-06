<template>
  <div id="app">
    <!-- 面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">主页面</el-breadcrumb-item>
      <el-breadcrumb-item>个人主页</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-container style="width:95%" >
      <el-header>个 人 中 心</el-header>
        <!-- 左侧区域 -->
      <el-container style="padding-left:5%">
        <el-aside width="600px">
          <el-col :span="12">
            <div class="sub-title"></div>
            <div class="demo-basic--circle">
              <div class="logo_box">
                <img src="../components/images/logo2.png" alt="">
              </div>
              <div class="block">
                <span>欢迎您，{{this.userInfoForm.userID}}</span>
              </div>
            </div>
          </el-col>
          <div class="input_box">
            <!-- 左侧输入框相关 -->
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
                format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                placeholder="出生日期">
                </el-date-picker>
              </div>
            </el-form-item>
            </el-form>
            <el-button-group style="float: right; padding: 3px 0" type="text">
              <el-button type="primary" size="medium" round @click="changeUserInfo">保存</el-button>
            </el-button-group>
            </div>
        </el-aside>
        <!-- 右侧区域 -->
        <el-container style="padding-left:3%">
          <el-main>
            <div class="authority_box">
              <p>申请更多权限</p>
              <div>
                <el-select v-model="authority.value" placeholder="请选择">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="reason">
                <el-input
                v-model="authority.textarea"
                type="textarea"
                placeholder="请输入申请原因"
                :rows="4">
                </el-input>
              </div>
              <div class="apply">
                <el-button type="primary" size="medium" round @click="applyForAuth">申请</el-button>
              </div>
            </div>
            <div class="change_password">
              <p>密码修改</p>
              <el-form :model="change" class="change_form" :rules="changeRules" ref="changePWRef">
                <el-form-item label="新密码" prop="new">
                  <el-input v-model="change.new" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkNew">
                  <el-input v-model="change.checkNew" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <div class="change">
                  <el-button type="primary" size="medium" round @click="changePassword">修改</el-button>
                </div>
              </el-form>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  created () {
    this.showUserInfo()
  },
  data () {
    var validatePass = (rule, value, callback) => {
    // const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.change.new !== '') {
          this.$refs.changePWRef.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
    // const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.change.new) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userInfoForm: {
        userID: '',
        userName: '',
        address: '',
        email: '',
        birth: ''
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
      }],
      authority: {
        value: 'Admin',
        textarea: '',
        time: ''
      },
      change: {
        password: '',
        new: '',
        checkNew: ''
      },
      userInfoRules: {
        userName: [
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        address: [
          { min: 2, max: 10, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },
      changeRules: {
        checkNew: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        new: [
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    showUserInfo () {
      console.log(window.localStorage.getItem('userID'))
      const url = '/showInfo/' + window.localStorage.getItem('userID')
      axios.get(url)
        .then((res) => {
          console.log(res.data)
          this.userInfoForm.userID = res.data[0]
          this.userInfoForm.userName = res.data[1]
          this.userInfoForm.address = res.data[2]
          this.userInfoForm.email = res.data[3]
          this.userInfoForm.birth = res.data[4]
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeUserInfo () {
      const url = '/changeInfo/' + this.$data.userInfoForm.userID + '/' + this.$data.userInfoForm.userName + '/' + this.$data.userInfoForm.address + '/' + this.$data.userInfoForm.email + '/' + this.$data.userInfoForm.birth
      axios.get(url)
        .then((res) => {
          if (res.status !== 200) this.$message.error('保存失败')
          this.$message.success('保存成功')
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('保存失败')
        })
    },
    applyForAuth () {
      this.authority.time = this.timeFormat(new Date())
      const url = '/applyFor/' + this.$data.userInfoForm.userID + '/' + this.$data.authority.value + '/' + this.$data.authority.textarea + '/' + this.$data.authority.time
      axios.get(url)
        .then((res) => {
          if (res.status !== 200) this.$message.error('提交失败，请重试')
          this.$message.success('提交成功')
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('提交失败，请检查连接')
        })
    },
    changePassword () {
      const url = '/changePassword/' + this.$data.userInfoForm.userID + '/' + this.$data.change.new
      axios.get(url)
        .then((res) => {
          if (res.status !== 200) this.$message.error('提交失败，请重试')
          this.$message.success('提交成功')
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('提交失败，请检查连接')
        })
    },
    timeFormat (timeStamp) {
      const year = new Date(timeStamp).getFullYear()
      const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
      const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
      const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
      const ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
      return year + '-' + month + '-' + date + ' ' + hh + ':' + mm + ':' + ss
    }
  }
}
</script>

<style lang="less" scoped>
//.el-form {
//  padding-top: 0;
//}
//.el-form-item {
//  padding-top: 0;
//}
//.el-input {
//  padding-top: 10px;
//}
.el-header {
    line-height: 60px;
    text-align: center;
    background-color:#EAEDF1;
    margin-bottom: 30px;
    font-size: larger;
    font-family: Youyuan;
  }
  .el-aside {
    margin-top: 60px;
    line-height: 80px;
    text-align: center;
    height: 700px;
    background-color: #2b4e75;
    border-radius: 10px;
    margin-right: 15px;
    box-shadow: 0 0 10px #2b4b6b;
  }
  .el-main {
    line-height: 36px;
    text-align: center;
    height: 800px;
    //width: 50%;
    background-color: #98c5ea;
    border-radius: 10px;
    box-shadow: 0 0 10px #2b4b6b;
  }
  .block {
    font-size: larger;
    position: absolute;
    top:23%;
    left: 20%;
    font-family: Youyuan;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
  .box-card {
    //width: 1368px;
    width: 1000px;
    border-radius: 30px;
  }
  .input_box {
    position: absolute;
    top:57%;
    width: 26%;
    padding-left: 62px;
    padding-top: 20px;
    box-sizing: border-box;
  }
  .logo_box{
    height: 130px;
    width: 130px;
    border: 1px solid ghostwhite;
    background-color: ghostwhite;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 10px #2b4b6b;
    position: absolute;
    left: 33%;
    transform: translate(-50%, 20%);
    img {
        width: 100%;
        height: 100%;
    }
  }
  .authority_box {
    // 申请权限box
    position: absolute;
    top:31.6%;
    left: 52.5%;
    background-color: aliceblue;
    //width: 50%;
    width: 40%;
    height: 25%;
    border-radius: 10px;
  }
  .reason{
    position: absolute;
    left: 25.5%;
    //width: 80%;
    width: 50%;
    margin-top: 20px;
  }
  .apply {
    position: absolute;
    left: 52%;
    width: 80%;
    top: 80%;
  }
  .change_password {
    // 更改密码box
    position: absolute;
    top:61%;
    left: 52.5%;
    // width: 50%;
    width: 40%;
    height: 32%;
    background-color: aliceblue;
    border-radius: 10px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .change {
    position: absolute;
    left: 52%;
    width: 80%;
    top: 80%;
  }
</style>
