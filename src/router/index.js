import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '马年好运签' }
  },
  {
    path: '/home-simple',
    name: 'HomeSimple',
    component: () => import('@/views/HomeSimple.vue'),
    meta: { title: '马年好运签 - 简化版' }
  },
  {
    path: '/sign-select',
    name: 'SignSelect',
    component: () => import('@/views/SignSelect.vue'),
    meta: { title: '选择签类' }
  },
  {
    path: '/user-info',
    name: 'UserInfo',
    component: () => import('@/views/UserInfo.vue'),
    meta: { title: '填写信息' }
  },
  {
    path: '/shake',
    name: 'Shake',
    component: () => import('@/views/Shake.vue'),
    meta: { title: '摇签' }
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('@/views/Result.vue'),
    meta: { title: '签文结果' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '马年好运签'
  next()
})

export default router