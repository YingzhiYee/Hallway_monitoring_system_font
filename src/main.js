import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import '@/assets/css/global.css'
import Store from './store.js'
import axios from 'axios'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

// // 配置请求的根路径
axios.defaults.baseURL = '/api' // 'http://127.0.0.1:5000'
axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://localhost:8080'

// // axios请求拦截
// axios.interceptors.request.use(config => {
//   console.log(config)
//   // 为请求头对象，添加Token验证的Authorization字段
//   // 把token请求发送到服务器端
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 在最后必须return config
//   return config
// })
// Vue.prototype.$http = axios

Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => {
  // to要跳转到的路径
  // from从哪个路径来
  // next往下执行的回调
  // 在localStorage中获取token
  const token = localStorage.getItem('userID')
  console.log('token is' + token)
  // 判断该页面是否需要登录
  if (to.meta.auth) {
    // 如果token存在直接跳转
    if (token) {
      next()
    } else {
      // 否则跳转到login登录页面
      next({
        path: '/login',
        // 跳转时传递参数到登录页面，以便登录后可以跳转到对应页面
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    // 如果不需要登录，则直接跳转到对应页面
    next()
  }
})

new Vue({
  Store,
  router,
  Video,
  render: h => h(App)
}).$mount('#app')
//
// axios({
//   url:'',
//   params: { // 系统会自动拼接到url后面
//     // 专门针对get请求的参数拼接
//     type: 'pop',
//     page: 1
//   },
//   method:'get'
// }).then(res => {
//   console.log(res)
// })
