import { createRouter, createWebHistory } from 'vue-router'

import MyNoNoView from '@/pages/MyNoNo.vue'
import MyPageView from '@/pages/MyPage.vue'
import ManageView from '@/components/mypage/Manage.vue'
// import MyPageNavView from '@/pages/MyPageNav.vue'

const router = createRouter({
    // 뒤로가기 가능
    history: createWebHistory(),
    routes : [
        // { path: '/user/:id', component:  },
        { path: '/mypage/:id',
            component: MyPageView,
            children : [
                {
                    path : "",
                    component : ManageView
                },
                {
                    path : "/nono/:id/:nonoId",
                    component : MyNoNoView,
                }
            ]},
        // { path: '/nono/:id/:isSolved', component:  MyIngNoNoView},
        // { path: '/nono/:id/:isSolved', component:  MySolvedNoNoView},
        // { path: '/post/:id', component:  MyPostView},
    ]
})

export default router;