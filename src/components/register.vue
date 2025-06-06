<template>
  <div class="register_container">
    <img src="../assets/la3-1.jpg" height="100%" width="100%">
    <div class="register_box">
      <div class="logo_box">
        <img src="../components/images/logo2.png" alt="">
      </div>
      <el-form :model="registerForm" label-width="80px" class="register_form" :rules="registerRules"
        ref="registerFormRef">
        <el-form-item>
          <p>用户注册</p>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="Comformpassword" label="确认密码">
          <el-input v-model="registerForm.Comformpassword" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱地址">
          <el-input v-model="registerForm.email" prefix-icon="el-icon-message"></el-input>
          <el-button type="primary" @click="sendRegisterInfo" class="emailSendBtn">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="CheckingCode" label="验证码">
          <el-input v-model="registerForm.CheckingCode" prefix-icon="el-icon-circle-check"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetRegisterForm">重置</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.password !== '') {
          this.$refs.registerFormRef.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 检查ID不重复
    var userIDCheck = (rule, value, callback) => {
      const url = '/userIDCheck/' + this.$data.registerForm.username
      axios.get(url)
        .then((res) => {
          console.log(res)
          const userList = res.data
          console.log(userList)
          if (!userList) {
            return
          }
          console.log(userList)
          userList.forEach((item) => {
            if (item === value) {
              callback(new Error('用户名已存在，请换一个用户名'))
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // 检查验证码正确性
    var captchaCheck = (rule, value, callback) => {
      const data = this.registerForm.captcha
      if (value !== data) {
        console.log(value)
        console.log(data)
        callback(new Error('验证码错误！'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        email: '',
        CheckingCode: '',
        captcha: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          { validator: userIDCheck, trigger: 'blur' }
        ],
        password: [
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        Comformpassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        CheckingCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' },
          { validator: captchaCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetRegisterForm () {
      this.$refs.registerFormRef.resetFields()
    },
    register () {
      const url = '/register/' + this.$data.registerForm.email + '/' + this.$data.registerForm.password + '/' + this.$data.registerForm.username
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) return this.$message.error('注册失败，请重试')
          this.$message.success('注册成功')
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sendRegisterInfo () {
      const url = '/registerEmail/' + this.$data.registerForm.email
      axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.status !== 200) return this.$message.error('发送失败，请重试')
          // 转换数据类型为字符串
          this.registerForm.captcha = res.data.toString()
          console.log(Object.prototype.toString.call(this.registerForm.captcha))
          console.log(this.registerForm.captcha)
          this.$message.success('发送成功，请接收')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.register_container {
  //background-color: #2b4b6b;
  height: 100%;
}

.register_box {
  width: 500px;
  height: 600px;
  //background-color: ghostwhite;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -20%);
}

.logo_box {
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

.register_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  p {
    position: absolute;
    left: 50%;
    transform: translate(-100%, -160%);
    font-family: Youyuan;
    font-size: larger;
  }
}

.emailSendBtn {
  display: flex;
  //position: absolute;
  //padding-right: 5px;
  justify-content: right;
}
</style>
