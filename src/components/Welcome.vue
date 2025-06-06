<template>
<div class="welcome_container">
  <img src="../assets/la3.jpg" height="100%" width="100%">
  <h1 class="title-box-1">WELCOME TO</h1>
  <h1 class="title-box-2">O   W   L</h1>
  <el-button type="text" class="title-box-3-1" @click="loginAct">SIGN    IN---</el-button>
  <el-button type="text" class="title-box-3-2" round id="registerbtn" @click="registerAct">REGISTER</el-button>
<!--    <div class="welcome_box">-->
<!--&lt;!&ndash;        <div class="logo_box">&ndash;&gt;-->
<!--&lt;!&ndash;            <img src="../components/images/logo2.png" alt="">&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <div class="botton_box">-->
<!--            <el-col>-->
<!--                <el-button round id="registerbtn" @click="registerAct">新 会 员 注 册</el-button>-->
<!--            </el-col>-->
<!--&lt;!&ndash;            <el-col>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-button round @click="loginAct">会 员 登 陆</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--            <el-col>-->
<!--                <el-button round>关 于 我 们</el-button>-->
<!--            </el-col>-->
<!--            <el-col>-->
<!--                <el-button round>退 出</el-button>-->
<!--            </el-col>-->
<!--        </div>-->
<!--    </div>-->
</div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    registerAct () {
      this.$router.push('/register')
    },
    loginAct () {
      this.$router.push('/login')
    }
  },
  created () {
    window.localStorage.clear()
  }
}
</script>

<style lang="less" scoped>
.welcome_container {
    //background-color: #2b4b6b;
    height: 100%;
}
.title-box-1{
  color: black;
  font-size: 100px;
  position: absolute;
  left: 8%;
  top:15%;
}
.title-box-2{
  color: black;
  font-size: 85px;
  position: absolute;
  left: 11%;
  top:26%;
}
.title-box-3-1{
  color: black;
  font-size: 60px;
  position: absolute;
  right:11%;
  top:53%;
}
.title-box-3-2{
  color: black;
  font-size: 60px;
  position: absolute;
  right:9%;
  top:61%;
}
.welcome_box{
  width: 450px;
  height: 500px;
  //background-color: #777777;
  border-radius: 10px;
  position: absolute;
  right: 11%;
  top:50%;
  //transform: translate(-50%, -20%);
  //width: 100%;
  //height: 100%;
}
//
//.logo_box{
//    height: 130px;
//    width: 130px;
//    border: 1px solid ghostwhite;
//    background-color: ghostwhite;
//    border-radius: 50%;
//    padding: 5px;
//    box-shadow: 0 0 10px #2b4b6b;
//    position: absolute;
//    left: 50%;
//    transform: translate(-50%, -50%);
//    img {
//        width: 100%;
//        height: 100%;
//    }
//}
//.el-button{
//  color: white;
//  background-color: #2b4b6b;
//  border-color: #000000;
//  height: 80px;
//  width: 350px;
//  font-size: larger;
//  font-family: Youyuan;
//  margin-bottom: 15px;
//}
.botton_box{
    padding-top: 80px;
    transform: translate(10%, 5%);
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  picture:'../assets/owl.png'
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
