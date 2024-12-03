import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import '@/access'

const app = createApp(App)
const pinia = createPinia()

app.use(createPinia())
app.use(Antd)
app.use(router)
app.use(pinia)

app.mount('#app')
