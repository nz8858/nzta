import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Lottery from './views/Lottery.vue'
import Game from './views/Game.vue'
import CardMaker from './views/CardMaker.vue'
import WishWall from './views/WishWall.vue'
import Admin from './views/Admin.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/lottery', component: Lottery },
  { path: '/game', component: Game },
  { path: '/card', component: CardMaker },
  { path: '/wish', component: WishWall },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem('user')
  if(to.path !== '/login' && !userToken) {
    next('/login')
  } else {
    next()
  }
})

export default router
