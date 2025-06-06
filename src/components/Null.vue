<template>
  <div id="app">
    <form action = "">
      <p>请输入通知消息：</p>
      <p><input type = "text"  v-model="input.message1"/></p>
      <p><input type = "text"  v-model="input.message2"/></p>
<!--      <p><input type = "text" name="guest"/></p>-->
    </form>
    <el-button type="primary" @click="getBackend">提交到后端</el-button>
<!--    要给后端的-->
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
<!--    <el-input-->
<!--      type="textarea"-->
<!--      :rows="2"-->
<!--      placeholder="请输入内容"-->
<!--      name="guest">-->
<!--      &lt;!&ndash;      v-model="textarea">&ndash;&gt;-->
<!--    </el-input>-->
  </div>
</template>

<script>
// 导入组件
// import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
// import Store from "./store.js";

export default {
  name: 'app',
  // components: {
  //   HelloWorld
  // },
  data () {
    return {
      textarea: '', // 后端给前端的数据
      input: {
        message1: '', // 前端给后端的数据1
        message2: '' // 前端给后端的数据2
      }
    }
  },
  // computed: {
  //   returnData () {
  //     return this.$store.getters.bkdata
  //   }
  // },
  // created () {
  //   // this.getBackend()
  // },
  methods: {
    // 在method里面定义一个向后端传递参数的方法
    // async fetch () {
    //   const { data: resp } = await this.$http.post('http://127.0.0.1:5000/guest/', this.textarea)
    //   const { data: textarea } = await this.$http.post('http://127.0.0.1:5000/guest/', this.textarea)
    //   if (resp == 400) return this.$message.error(resp.msg);//对于返回值做了一个处理
    // }

    getBackend () {
      const url = '/guest/' + this.$data.input.message1 + '/' + this.$data.input.message2

      axios.get(url)
        .then(res => { // 获取结果
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
