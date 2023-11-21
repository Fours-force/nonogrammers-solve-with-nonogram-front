import './assets/css/input.css'

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia' 
import { useAuthStore } from './stores/auth.store'
import { setupAxiosInterceptors } from './js/axiosHandler';


createApp(App).use(router).use(createPinia()).mount('#app')

const authStore = useAuthStore();
setupAxiosInterceptors(authStore);


