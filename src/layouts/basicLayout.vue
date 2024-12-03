<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import { getCurrentUser } from '@/api/user'

getCurrentUser().then((res) => {
  console.log(res)
})
</script>

<template>
  <div id="basic-layouts">
    <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
      <a-layout>
        <a-layout-header class="header">
          <GlobalHeader />
        </a-layout-header>
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
        <a-layout-footer class="footer">
          <a href="https://github.com/abcLiyew" target="_blank"> 饿死的流浪猫github主页 </a>
        </a-layout-footer>
      </a-layout>
    </a-space>
  </div>
</template>

<style scoped>
#basic-layouts .footer {
  background-color: #efefef;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}
#basic-layouts .content {
  padding: 20px;
  margin-bottom: 20px;
  background: linear-gradient(to right, #fefefe, #ffffff);
}
#basic-layouts .header {
  background-color: #ffffff;
  margin-bottom: 16px;
  color: unset;
  padding-inline: 20px;
}
</style>
