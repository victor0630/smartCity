import Vue from 'vue'
import Vuex from 'vuex'
import ws from './moudules/ws'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show:false,
    active:0
  },
  mutations: {
    add(state){
      this.state.show = true
    },
    delete(state){
      this.state.show = false
    },
    account(state){
      this.state.active = 0
    },
    account1(state){
      this.state.active = 1
    },
    account2(state){
      this.state.active = 2
    },
    account3(state){
      this.state.active = 3
    },
  },
  actions: {

  },
  modules: {
    ws
  }
})
