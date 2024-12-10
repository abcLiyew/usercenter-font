<script setup lang="ts">
import { ref } from 'vue'
import { useLoginUserStore } from '@/store/useLoginUserStore'
import { UserOutlined } from '@ant-design/icons-vue'

const selectedKeys2 = ref<string[]>(['1'])
const loginUserStore = useLoginUserStore()
const loginUser = loginUserStore.loginUser
</script>

<template>
  <div id="mySpace">
    <h1>
      <a-space direction="vertical" :size="32">
        <a-space wrap :size="16">
          <a-avatar
            :size="64"
            :src="loginUser.avatarUrl"
            icon="VNode"
            draggable="false"
            loadError="false"
          >
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </a-space>
      </a-space>
      {{ loginUser.username }}
    </h1>
    <a-layout>
      <a-layout-content>
        <a-layout style="padding: 24px 0; background: #fff">
          <a-layout-sider width="200" style="background: #fff">
            <a-menu v-model:selectedKeys="selectedKeys2" mode="inline" style="height: 100%">
              <a-menu-item key="1">基本信息</a-menu-item>
              <a-menu-item key="2">个人简介</a-menu-item>
              <a-menu-item key="3">关于</a-menu-item>
              <a-menu-item key="4">其他</a-menu-item>
            </a-menu>
          </a-layout-sider>
          <a-layout-content :style="{ padding: '0 24px', minHeight: '479px' }">
            <div v-if="selectedKeys2[0] === '1'">
              <strong>uid:</strong> {{ loginUser.id }}<br /><br />
              <strong>用户名:</strong> {{ loginUser.username==null?'未设置':loginUser.username }}<br /><br />
              <strong>账号:</strong> {{ loginUser.userAccount }}<br /><br />
              <strong>性别：</strong> {{ loginUser.gender!==null?(loginUser.gender===1?'男':'女'):"未设置" }}<br /><br />
              <strong>电话：</strong> {{ loginUser.phone===null?'未绑定':loginUser.phone }}<br /><br />
              <strong>邮箱：</strong> {{ loginUser.email===null?'未绑定':loginUser.email}}<br /><br />
              <strong>校验编号：</strong> {{ loginUser.inspectionCode }}<br /><br />
            </div>
            <div v-else-if="selectedKeys2[0] == '2'">
              <strong>履历：</strong>
              <a-space direction="vertical">
                <a-space-item>
                  <a-tag color="green">在校期间</a-tag>
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="blue">假期期间</a-tag>
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="red">其他</a-tag>
                </a-space-item>
              </a-space>
            </div>
            <div v-else-if="selectedKeys2[0] == '3'">
              <strong>作者：</strong> 郑州工程技术学院 信息工程学院 软件工程二班 黎业河
              <br /><br />
              <strong>学号：</strong> 202252340223
              <br /><br />
              <strong>本项目用的的技术栈：</strong><br />
              <a-space direction="vertical">
                <a-space-item>
                  <br />
                  <a-tag color="blue">vue3</a-tag>作为项目框架
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="red">ant-design-vue</a-tag>作为组件库
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="green">axios</a-tag> 用于从后端获取数据
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="gold">pinia</a-tag> 用于存储登录状态
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="purple">vue-router</a-tag> 用于页面跳转
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="orange">TypeScript</a-tag> 作为基本的编程语言
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="geekblue">Vite</a-tag> 作为项目的构建工具
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="volcano">Node.js</a-tag> 作为前端项目服务器
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="lime">ES6</a-tag> 作为基本语法
                </a-space-item>
                <br />
                <a-space-item>
                  <a-tag color="magenta">ESLink</a-tag>作为代码检查工具
                </a-space-item>
              </a-space>
            </div>
            <div v-else>
              <strong>其他：</strong> 等待您的发掘
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        黎业河 ©2024 郑州工程技术学院信息工程学院
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#mySpace {
}
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
