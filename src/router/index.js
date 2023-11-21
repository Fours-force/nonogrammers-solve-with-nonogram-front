import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router'

// USER
import Home from '@/pages/Home.vue'
import Join from '@/pages/Join.vue'
import Login from '@/pages/Login.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ResetPassword from '@/pages/ResetPassword.vue'

import { useAuthStore } from '@/stores/auth.store'

// POST
import Community from '@/components/community/community.vue'
import Detail from '@/components/community/detail.vue'
import Write from '@/components/community/write.vue'

// NONO
import nonodots from "../components/nono/nonodots.vue";
import nonobox from "../components/nono/nonobox.vue"

// MYPAGE
import MyNoNoView from '@/pages/MyNoNo.vue'
import MyPageView from '@/pages/MyPage.vue'
import ManageView from '@/components/mypage/Manage.vue'
import MyPostView from '@/components/mypage/MyPost.vue'

const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', component: Home },
        { path: '/join', component: Join},
        { path: '/login', component: Login},
        { path: '/forgot-password', component: ForgotPassword},
        { path: '/reset-password', component: ResetPassword},
        { path: '/post', component: Community },
        { path: '/post/notice', component: Community },
        { path: '/post/free', component: Community },
        { path: '/post/qa', component: Community },
        { path: '/post/nono', component: Community },
        { path: '/post/all', component: Community },
        { path: '/search', component: Community },
        { path: '/detail', component: Detail },
        { path: '/detailComment', component: Detail },
        { path: '/deleteComment', component: Detail },
        { path: '/editComment', component: Detail },
        { path: '/post/write', component: Write },
        { path: '/postDelete', component: Community },
        { path: '/mypage/:nickName',
            component: MyPageView,
            children : [
                {
                    path : "",
                    component : ManageView
                },
                {
                    path : "/nono/:id/:nonoId",
                    component : MyNoNoView,
                },
                {
                    path: '/post/:id',
                    component:  MyPostView
                }
            ]},
        { path: "/nonodots/:userId/:nonoId/:baekjoonId", name: 'nonodots', component: nonodots},
        { path: "/nonobox", component: nonobox },
        { path: '/nono/detail/:id/:nonoId/:isSolved', component: nonodots},
        // { path: '/nono/:id/:isSolved', component: nonobox},
        // { },
    ]
});

// 모든 라우터 이동 전에 실행
router.beforeEach(async (to) => { // to: 탐색 될 경로 위치 객체, from: 탐색 전 현재 경로 위치 객체
    console.log("beforeEach")
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