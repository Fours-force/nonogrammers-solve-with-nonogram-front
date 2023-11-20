import { createRouter, createWebHistory } from 'vue-router'

import Community from '@/components/community/community.vue'
import Detail from '@/components/community/detail.vue'
import Write from '@/components/community/write.vue'


const router = createRouter({
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
    ]
})

export default router;