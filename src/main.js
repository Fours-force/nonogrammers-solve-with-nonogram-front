import './assets/css/dist/output.css'
import './assets/css/input.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')