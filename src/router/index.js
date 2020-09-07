import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  },

  {
    path: '/loginIndex',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    children:[
      {
        path: '/index',
        name: 'Index',
        redirect: "/warn",
        component: () => import('@/views/menu.vue'),
        children: [{
          path: '/warn',
          name: '告警',
          component: () => import('@/views/warn/warn.vue')
        }, {
          path: '/deviceManage',
          name: '设备管理',
          component: () => import('@/views/deviceManage/deviceManage.vue')
        }, {
          path: '/library',
          name: 'library',
          component: () => import('@/views/bottomSet/library.vue'),
          children: []
        },
        
        {
          path: '/statistics',
          name: 'statistics',
          component: () => import('@/views/statistics/statistics.vue'),
          children: []
        },
        
        ]
      },
      {
        path: '/person',
        name: 'person',
        component: () => import('@/views/bottomSet/person.vue'),
        children: []
      },
      {
        path: '/blackList',
        name: 'blackList',
        component: () => import('@/views/bottomSet/blackListPerson.vue'),
        children: []
      },
      {
        path: '/videoPlay',
        name: '视频播放',
        props: true,
        component: () => import('@/views/deviceManage/videoPlay.vue')
      },
      {
        path: '/more',
        name: 'more',
        props: true,
        component: () => import('@/views/deviceManage/more.vue')
      },
      {
        path: '/cloudVideo',
        name: 'cloudVideo',
        props: true,
        component: () => import('@/views/deviceManage/cloudVideo.vue')
      },
      {
        path: '/personal',
        name: 'personal',
        props: true,
        component: () => import('@/views/personal/personal.vue')
      },
      {
        path: '/password',
        name: 'password',
        props: true,
        component: () => import('@/views/personal/password.vue')
      },
      {
        path: '/playVideo',
        name: 'playVideo',
        props: true,
        component: () => import('@/views/deviceManage/playVideo.vue')
      },
      {
        path: '/addEquipment',
        name: 'addEquipment',
        component: () => import('@/views/deviceManage/addEquipment.vue')
      }
    ]
  },

  
  
]

const router = new VueRouter({
  routes
})

export default router
