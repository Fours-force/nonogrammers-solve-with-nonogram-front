import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Join from '@/pages/Join.vue'
import Login from '@/pages/Login.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ResetPassword from '@/pages/ResetPassword.vue'

import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', component: Home },
        { path: '/join', component: Join},
        { path: '/login', component: Login},
        { path: '/forgot-password', component: ForgotPassword},
        { path: '/reset-password', component: ResetPassword}
    ]
});

// 모든 라우터 이동 전에 실행
router.beforeEach(async (to) => { // to: 탐색 될 경로 위치 객체, from: 탐색 전 현재 경로 위치 객체

    const authStore = useAuthStore();
    const { user, returnUrl } = storeToRefs(authStore);
    
    // 로그인이 필요하지 않은 페이지 목록
    const publicPages = import.meta.env.VITE_PUBLIC_PAGES.split(',');
    const authRequired = !publicPages.includes(to.path);

    // 로그인이 필요한 페이지에 접근하려고 할 때, 로그인이 되어있지 않으면 로그인 페이지로 이동
    if (authRequired && user.value===null) {
        returnUrl.value = to.fullPath;
        alert("로그인이 필요합니다!")
        router.push('/login');
    }
});

export default router;