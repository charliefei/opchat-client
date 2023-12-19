import './assets/css/main.scss'

import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(Quasar, {
    plugins: {
      Notify
    }, // import Quasar plugins and add here
    lang: quasarLang
  })
  .use(router)
  .use(pinia)
  .mount('#app')
