<template>
  <div id="global-header" class="global-header">
    <a-row :wrap="false">
      <a-col flex="300px">
        <div class="title-bar">
          <img src="../assets/logo.png" alt="logo" class="logo" />
          <div class="title">饿死的流浪猫的用户中心</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="80px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            {{ JSON.stringify(loginUserStore.loginUser.username) }}
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { HomeOutlined, CrownOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/useLoginUserStore'
const loginUserStore = useLoginUserStore()
const router = useRouter()

const doMenuClick = ({ key }: { key: string }) => {
  router.push({ path: key })
}

const current = ref<string[]>(['mail'])
router.afterEach((to, from, next) => {
  current.value = [to.path]
})
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/user/login',
    label: '用户登录',
    title: '用户登录',
  },
  {
    key: '/user/register',
    label: '用户注册',
    title: '用户注册',
  },
  {
    key: '/admin/userManage',
    icon: () => h(CrownOutlined),
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: 'other',
    label: h('a', { href: 'https://github.com/abcLiyew', target: '_blank' }, 'Github主页'),
  }
])
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.title {
  color: black;
  font-size: 18px;
  margin: 0 16px;
}
.logo {
  width: 48px;
  height: 48px;
}
</style>
