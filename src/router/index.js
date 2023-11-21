import { createRouter, createWebHistory } from 'vue-router'
import Community from '@/components/community/community.vue'
import Detail from '@/components/community/detail.vue'
import Write from '@/components/community/write.vue'
import nonodots from "../components/nono/nonodots.vue";
import nonobox from "../components/nono/nonobox.vue"
import MyNoNoView from '@/pages/MyNoNo.vue'
import MyPageView from '@/pages/MyPage.vue'
import ManageView from '@/components/mypage/Manage.vue'
import MyPostView from '@/components/mypage/MyPost.vue'

const router = createRouter({
    // 뒤로가기 가능
    history: createWebHistory(),
    routes : [
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
                },
                {
                    path: '/post/:id',
                    component:  MyPostView
                }
            ]},
        { path: "/nonodots/:userId/:nonoId/:baekjoonId", component: nonodots},
        { path: "/nonobox", component: nonobox },
        { path: '/nono/detail/:id/:nonoId/:isSolved', component: nonodots},
        // { path: '/nono/:id/:isSolved', component:  MySolvedNoNoView},
        { },
    ]
})

export default router;