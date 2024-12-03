import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path:'/user/login',
      name:'login',
      component:UserLoginPage,
    },
    {
      path:'/user/register',
      name:'userRegister',
      component:UserRegisterPage,
    },
    {
      path:'/admin/userManage',
      name:'userForget',
      component:UserManagePage,
    },
  ],
})

export default router
