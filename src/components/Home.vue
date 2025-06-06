<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
<!--      <div class="image_box">-->
<!--        <img src="../assets/owl.png" alt="">-->
<!--      </div>-->
      <div class="image_box-2">
        <img src="../assets/la3-2.jpg" alt="">
      </div>
      <div class="text_box">
        <span>O W L - 居 民 楼 监 测 系 统</span>
      </div>
      <div class="button_box">
        <el-button type="success" plain @click="logout">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="300px">
        <!-- 侧边栏菜单区 -->
        <!-- "#af3be4" -->
        <el-menu
          background-color= #f6f6f6
          text-color=""
          active-text-color= #409EFF
          :collapse-transition="false"
          router="true" >
          <!-- 菜单1 -->
          <el-submenu index="home">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-home"></i>
              <!-- 文本 -->
              <span>监控管理</span>
            </template>
              <el-menu-item index="monitor4">
<!--              <el-menu-item herf="http://127.0.0.1:5000">-->
                <template slot="title">
                  <i class="el-icon-video-camera"></i>
                  <span>实时监控</span>
                </template>
              </el-menu-item>
              <el-menu-item index="intrusionRecord">
                <template slot="title">
                  <i class="el-icon-s-release"></i>
                  <span>入侵记录</span>
                </template>
              </el-menu-item>
              <el-menu-item index="areaChoose" :disabled="controlForm.notPowerUser">
                <template slot="title">
                  <i class="el-icon-add-location"></i>
                  <span>区域选择</span>
                </template>
              </el-menu-item>
<!--            </el-menu-item-group>-->
<!--            <el-menu-item-group title="分组二">-->
<!--              <el-menu-item index="whiteList">-->
<!--                <template slot="title">-->
<!--                  <i class="el-icon-user"></i>-->
<!--                  <span>白名单申请</span>-->
<!--                </template>-->
<!--              </el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--            <el-submenu index="charts">-->
<!--              <template slot="title">监测数据分析统计图</template>-->
<!--            </el-submenu>-->
          </el-submenu>
          <!-- 菜单3 -->
          <el-menu-item index="personalPage">
            <i class="el-icon-menu"></i>
            <span slot="title">个人主页</span>
            <!-- 菜单2.2 -->
          </el-menu-item>
          <!-- 菜单4 -->
          <el-submenu index="userManagement" :disabled="controlForm.notAdmin">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-document"></i>
              <!-- 文本 -->
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="applicationAssessment">
                <template slot="title">
                  <i class="el-icon-circle-check"></i>
                  <span>申请审批</span>
                </template>
              </el-menu-item>
              <el-menu-item index="userManagement">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>普通用户管理</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 菜单2 -->
          <el-submenu >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-help"></i>
              <!-- 文本 -->
              <span>数据分析</span>
            </template>
            <el-menu-item index="lineChart">
              <template slot="title">
                <i class="el-icon-data-line"></i>
                <span>近四天入侵次数分析</span>
              </template>
            </el-menu-item>
            <el-menu-item index="pieChart">
              <template slot="title">
                <i class="el-icon-pie-chart"></i>
                <span>近五天入侵时长比较</span>
              </template>
            </el-menu-item>
            <el-menu-item index="radarChart">
              <template slot="title">
                <i class="el-icon-magic-stick"></i>
                <span>近六天入侵次数</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--        &lt;!&ndash; 侧边栏菜单区 &ndash;&gt;-->
<!--        <el-menu-->
<!--          background-color="#333744"-->
<!--          text-color="#fff"-->
<!--          active-text-color="#ffd04b"-->
<!--          :collapse-transition="false"-->
<!--          router="true" >-->
<!--          &lt;!&ndash; 一级菜单1 &ndash;&gt;-->
<!--          <el-submenu index="1">-->
<!--&lt;!&ndash;                      v-for="item in menulist" key="item.id">&ndash;&gt;-->
<!--            &lt;!&ndash; 一级菜单的模板区域 &ndash;&gt;-->
<!--            <template slot="title">-->
<!--              &lt;!&ndash; 图标 &ndash;&gt;-->
<!--              <i class="el-icon-location"></i>-->
<!--              &lt;!&ndash; 文本 &ndash;&gt;-->
<!--              <span>监控管理</span>-->
<!--            </template>-->

<!--            &lt;!&ndash; 二级菜单 &ndash;&gt;-->
<!--              <el-menu-item index="">选项1</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-menu>-->
<!--      </el-aside>-->
      <!-- 右边内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      controlForm: {
        notAdmin: true,
        notPowerUser: true
      }
    }
  },
  created () {
    this.setPermission()
  },
  methods: {
    setPermission () {
      if (window.localStorage.getItem('permission') === 'Admin') {
        console.log(window.localStorage.getItem('permission') === 'Admin')
        this.controlForm.notAdmin = false
        this.controlForm.notPowerUser = false
      } else if (window.localStorage.getItem('permission') === 'powerUser') {
        this.controlForm.notPowerUser = false
      }
    },
    logout () {
      this.$router.push('/login')
      window.localStorage.clear()
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.el-header{
  height: 10%;
  //background-color: #a5e1eb;
  //background-color: #9b9b9b;
  background-color: #646464;
  display: flex;
  padding-left: 0;
  //color: #fff;
  //color: #ffffff;
  color: black;
  font-size: 30px;
  align-items: center;
  .text_box{
    display: flex;
    align-items: center;
    span{
      margin-left: 60px;
    }
  }
  .image_box{
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: space-between;
  }
  .image_box-2{
    height: 60px;
    width: 1200px;
    display: flex;
  }
  .button_box{
    position: absolute;
    left: 90%;
    top: 1.3%;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
.el-aside{
  //background-color: #a5e1eb;
  background-color: #f6f6f6;
}
.el-main{
  background-color: #EAEDF1;
}
</style>
