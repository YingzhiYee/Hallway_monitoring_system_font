import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/register.vue'
import Home from '@/components/Home.vue'
// import Null from '@/components/Null.vue'
import Welcome from '@/components/Welcome.vue'
// import Monitor from '@/components/Monitor.vue'
import IntrusionRecord from '@/components/IntrusionRecord.vue'
// import WhiteList from '@/components/WhiteList.vue'
import LineChart from '@/components/Charts/lineChart.vue'
import PieChart from '@/components/Charts/pieChart.vue'
import RadarChart from '@/components/Charts/radarChart.vue'
import PersonalPage from '@/components/PersonalPage.vue'
import UserManagement from '@/components/UserManagement.vue'
import ApplicationAss from '@/components/ApplicationAss.vue'
import AreaChoose from '@/components/areaChoose.vue'

// import Monitor2 from '@/components/Monitor2.vue'
// import Monitor3 from '@/components/Monitor3.vue'
import Monitor4 from '@/components/Monitor4.vue'

Vue.use(Router)

export default new Router({
  //  写路由服务
  routes: [
    // { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/welcome', component: Welcome },
    { path: '/', redirect: '/welcome' },
    { path: '/register', component: Register },
    // { path: '/null', component: Null },
    {
      path: '/home',
      component: Home,
      children: [
        // 写子路由  显示在主区域
        // { path: '/monitor', component: Monitor },
        { path: '/intrusionRecord', component: IntrusionRecord, meta: { auth: true } },
        // { path: '/whiteList', component: WhiteList, meta: { auth: true } },
        { path: '/lineChart', component: LineChart, meta: { auth: true } },
        { path: '/pieChart', component: PieChart, meta: { auth: true } },
        { path: '/radarChart', component: RadarChart, meta: { auth: true } },
        { path: '/personalPage', component: PersonalPage, meta: { auth: true } },
        { path: '/userManagement', component: UserManagement, meta: { auth: true } },
        { path: '/applicationAssessment', component: ApplicationAss, meta: { auth: true } },
        // { path: '/monitor2', component: Monitor2 },
        // { path: '/monitor3', component: Monitor3 },
        { path: '/monitor4', component: Monitor4, meta: { auth: true } },
        { path: '/areaChoose', component: AreaChoose, meta: { auth: true } }
      ],
      meta: {
        auth: true
      }
    }
  ]
})

// const router = new VueRouter({
//
// })
