import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)

app.use(pinia)
app.use(plugin, defaultConfig())
app.mount('#app')
