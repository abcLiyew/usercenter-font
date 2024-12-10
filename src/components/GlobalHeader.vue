<template>
  <div id="global-header" class="global-header">
    <a-row :wrap="false">
      <a-col flex="300px">
        <div class="title-bar">
          <img src="../assets/logo.png" alt="logo" class="logo" />
          <div class="title">黎业河的用户中心</div>
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
      <a-col flex="100px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <a class="ant-dropdown-link" style="color: black" @click.prevent>
                {{
                  loginUserStore.loginUser.username == null
                    ? '用户名未设置'
                    : loginUserStore.loginUser.username
                }}
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button type="link" @click="logout()">退出登录</a-button>
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="mySpace()">个人空间</a-button>>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
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
import {
  HomeOutlined,
  CrownOutlined,
  UserOutlined,
  UserAddOutlined,
  GithubOutlined,
} from '@ant-design/icons-vue'
import { type MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/store/useLoginUserStore'
import { userLogout } from '@/api/user'
const loginUserStore = useLoginUserStore()
const router = useRouter()

const doMenuClick = ({ key }: { key: string }) => {
  router.push({ path: key })
}

const current = ref<string[]>(['mail'])
router.afterEach((to) => {
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
    icon: () => h(UserOutlined),
    label: '用户登录',
    title: '用户登录',
  },
  {
    key: '/user/register',
    icon: () => h(UserAddOutlined),
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
    icon: () => h(GithubOutlined),
    label: h(
      'a',
      { href: 'https://github.com/abcLiyew/usercenter-font', target: '_blank' },
      'Github',
    ),
  },
])
const logout = async () => {
  const res = await userLogout(loginUserStore.loginUser)
  //退出登录后记录登录信息
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({})
    message.success('退出登录成功！')
    await router.push({
      path: '/',
      replace: true,
    })
  } else {
    message.error('退出登录失败！')
  }
}
const mySpace = () => {
  router.push({
    path: '/user/mySpace',
    replace: false,
  })
}
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
