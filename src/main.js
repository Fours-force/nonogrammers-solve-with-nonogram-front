import './assets/css/input.css'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia' 

axios.defaults.withCredentials = true;
createApp(App).use(router).use(createPinia()).mount('#app')
