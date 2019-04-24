import Vue from 'vue'
import Vuex from 'vuex'
// import common from './modules/common' // 同步

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions: common.actions,
  getters: {},
  modules: {},
  state: common.state,
  mutations: common.mutations
})

export default store
