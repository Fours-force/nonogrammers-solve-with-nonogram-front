import { createRouter, createWebHistory } from 'vue-router'

import nonodots from "../components/nono/nonodots.vue";
import nonobox from "../components/nono/nonobox.vue"
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
      { path: "/nonodots/:userId/:nonoId/:baekjoonId", component: nonodots},
      { path: "/nonobox", component: nonobox },
        // { path: '/nono/:id/:isSolved', component:  MyIngNoNoView},
        // { path: '/nono/:id/:isSolved', component:  MySolvedNoNoView},
        // { path: '/post/:id', component:  MyPostView},
    ]
})

export default router;