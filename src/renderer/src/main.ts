import './assets/css/main.scss'

import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

import socket from "@renderer/api/ws/websocket";
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

socket.init()
const app = createApp(App)
app.config.globalProperties.socket = socket
app.use(Quasar, {
  plugins: {
    Notify
  }, // import Quasar plugins and add here
  lang: quasarLang
})
app.use(router)
app.use(pinia)
app.mount('#app')
