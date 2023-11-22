<template>
    <div
        class="sticky top-0 hidden mt-3 bg-white border-2 border-solid rounded-lg sm:block min:w-4/12 border-mypage-left-nav h-fit">
        <ul class="w-full p-5 space-y-2 font-medium font-brr">
            <li>
                <p class="flex items-center p-2 text-2xl text-gray-900 rounded-md group">
                    <span class="ml-3 text-mypg-left-nav">내 활동</span>
                </p>
            </li>
            <li>
                <router-link :to="`/mypage/${props.user.userId.value}`">
                    <a
                        class="flex items-center p-2 text-lg text-gray-900 rounded-md active:bg-main-skyblue active:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ml-7">
                        <span class="flex-1 whitespace-nowrap">계정 관리</span>
                    </a>
                </router-link>
            </li>
            <li>
                <router-link :to="`/nono/${props.user.userId.value}/2`" :user="user"
                    class="flex items-center p-2 text-lg text-gray-900 rounded-md active:bg-main-skyblue active:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ml-7">
                    <span class="flex-1 whitespace-nowrap">내가 푼 노노들</span>
                </router-link>
            </li>
            <li>
                <router-link :to="`/nono/${props.user.userId.value}/1`" :user="user"
                    class="flex items-center p-2 text-lg text-gray-900 rounded-md active:bg-main-skyblue active:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ml-7">
                    <span class="flex-1 whitespace-nowrap">내가 풀고있는 노노들</span>
                </router-link>
            </li>
            <li>
                <router-link :to='`/post/${props.user.userId.value}`' :user="user"
                    class="flex items-center p-2 text-lg text-gray-900 rounded-md active:bg-main-skyblue active:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ml-7">
                    <span class="flex-1 whitespace-nowrap">작성한 글</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
const currentRouter = useRoute();

const page = ref(0);
const nonoId = ref(0);

onBeforeRouteUpdate(async (to, from, next) => {
    // URL이 변경될 때 수행할 로직
    console.log('URL이 변경되었습니다.');
    console.log('새로운 라우터:', to);
    console.log('이전 라우터:', from);

    page.value = to.path.split('/')[3];
    nonoId.value = to.path.split('/')[2];
    
    if (to.path === `/nono/${props.user.userId.value}/2` || to.path === `/nono/${props.user.userId.value}/1`) {
        page.value = to.path.split('/')[3];
        nonoId.value = to.path.split('/')[2];
        await getUserNoNo(page.value, nonoId.value);
    }
    
    next();
});

async function getUserNoNo() {
    // console.log(currentRouter.path.split('/')[3]);
    await axios
        .get(
            "http://localhost:8089/nono/" +
            nonoId.value +
            "/" + page.value
        )
        .then((response) => {
            props.user.nonoList.value = response.data;
        });
}
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});
onMounted(() => {
    getUserNoNo();
});
</script>