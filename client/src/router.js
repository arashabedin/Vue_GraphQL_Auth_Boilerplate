import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard'

Vue.use(Router)
const login = {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { title: 'Login' }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { title: 'Vue GraphQL Athentication', redirect: true}
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'Vue GraphQL Athentication', redirect: true}
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { title: 'Signup' }
    },
    login,
  ]
})
router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('user-id')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!auth) {
      next(login)
    }
  } else if (to.matched.some(record => record.meta.redirect)) {
    if(auth) {
      next(Dashboard)
    }
  }
  next()
})
router.afterEach((to, from) => {
  document.title = to.meta.title
})
export default router