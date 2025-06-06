import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    backendData: 'x', // yyz原先代码
    pathName: '',
    currDbSource: {},
    currJobData: {},
    DbSource: [],
    captcha: ''
  },
  mutations: {
    set_backdata (state, data) {
      state.backendData = data
    }
  },
  actions: {
    get_backdata ({ commit }, value) {
      commit('set_backdata', value)
      // commit('SET_TOKEN', value2)
    }
  },
  getters: { // 数据处理or计算
    bkdata (state) {
      return state.backendData
    }
  }, // yyz原先代码
  // 保存当前菜单栏的路径
  savePath (state, pathName) {
    state.pathName = pathName
  },
  // 保存当前点击的数据源
  saveCurrDbSource (state, currDbSource) {
    state.currDbSource = currDbSource
  },
  // 保存当前点击的元数据
  saveCurrJobData (state, currJobData) {
    state.currJobData = currJobData
  },
  // 保存所有数据源
  saveDbSource (state, DbSource) {
    state.DbSource = DbSource
  },
  // 验证码
  saveCaptcha (state, captcha) {
    state.captcha = captcha
  }
})
export default store
