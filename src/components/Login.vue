<template>
<div class="login_container">
  <img src="../assets/la3-1.jpg" height="100%" width="100%">
    <div class="login_box">
        <div class="logo_box">
            <img src="../components/images/logo2.png" alt="">
        </div>
        <el-form :model="loginForm" label-width="70px" class="login_form" :rules="loginRules" ref="loginFormRef">
            <el-form-item >
                <p>用户登录</p>
            </el-form-item>
            <el-form-item prop="username" label="用户名" color="white">
<!--              <br>-->
<!--              <p color="white" font-size="10px">用户名</p>-->
                <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码" >
                <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio-group v-model="loginForm.identity" >
                    <el-radio label="Admin"></el-radio>
                    <el-radio label="Regular"></el-radio>
                    <el-radio label="powerUser"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="login" >确定</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        identity: 'Regular'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      const url = '/login/' + this.$data.loginForm.username + '/' + this.$data.loginForm.password + '/' + this.$data.loginForm.identity
      axios.get(url)
        .then((res) => { // 获取结果
          console.log(res)
          if (res.data !== 'ok') return this.$message.error('登陆失败')
          this.$message.success('登陆成功')
          window.localStorage.setItem('userID', this.loginForm.username)
          console.log(window.localStorage.getItem('userID'))
          let isAdmin = false
          let isPowerUser = false
          if (this.loginForm.identity === 'Admin') {
            isAdmin = true
            isPowerUser = true
          } else if (this.loginForm.identity === 'powerUser') {
            isPowerUser = true
          }
          window.localStorage.setItem('notAdmin', !isAdmin)
          window.localStorage.setItem('notPowerUser', !isPowerUser)
          window.localStorage.setItem('permission', this.loginForm.identity)
          console.log(window.localStorage.getItem('permission'))
          console.log(window.localStorage.getItem('notAdmin'))
          console.log(window.localStorage.getItem('notPowerUser'))
          this.$router.push('/home')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
    //background-color: #2b4b6b;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 400px;
    //background-color: ghostwhite;
    //border-radius: 10px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -20%);
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
    left: 50%;
    transform: translate(-50%, -50%);
    img {
        width: 100%;
        height: 100%;
    }
}
.btns {
    display: flex;
    justify-content: flex-end;
}
.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    p {
      // 改用户登陆
      //color: white;
        position: absolute;
        left: 50%;
        transform: translate(-100%, -160%);
        font-family: Youyuan;
        font-size: larger;
    }
}
</style>
