import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import "@/assets/css/button.scss"
import "@/assets/css/global.scss"
import App from './App.vue'
import router from './router'
import store from './store'
import util from '@/commonjs/util';
import axios from '@/commonjs/axios';
import { Toast } from 'vant';
import api from "@/api/api";
import campus from "@/api/campus";
import dormitory from "@/api/dormitory";
import guest from "@/api/guest";
import kindergarten from "@/api/kindergarten";

import echarts from 'echarts'
import VCharts from 'v-charts'
Vue.prototype.$echarts = echarts
Vue.use(VCharts)

Vue.config.productionTip = false
Vue.prototype.$util = util;
Vue.prototype.$http = axios;
Vue.prototype.$Toast = Toast;
Vue.prototype.$api = api.api;
Vue.prototype.$campus = campus.campus;
Vue.prototype.$dormitory = dormitory.dormitory;
Vue.prototype.$guest = guest.guest;
Vue.prototype.$kindergarten = kindergarten.kindergarten;
Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}