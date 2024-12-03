<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('欢迎来到黎业河的用户中心，你将在黎业河的用户中心看到更多的功能哦！')
</script>

<template>
  <div id="home-page">
    <h1>{{msg}}</h1>
  </div>
</template>

<style scoped>
#home-page {
}
</style>
