import { createApp } from 'vue'
import App from './App.vue'
import useModules from './modules'
import { router } from './router'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'virtual:uno.css'

const app = createApp(App).use(router)

useModules(app, router)

app.mount('#app')
