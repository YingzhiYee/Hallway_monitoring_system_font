<template>
  <div id="app">
    <Header></Header>
    <!-- 路由占位符-->
    <!-- 路由渲染到的东西都会被显示在这个占位符内-->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header/header.vue'
export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>

</style>
