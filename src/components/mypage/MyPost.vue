<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { initFlowbite } from 'flowbite'
// import { FwbButton, FwbModal } from 'flowbite-vue'

const useRouter = useRoute();

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});
// const title = ref('');
// const content =ref('');
const postList = ref(Array);
// const index = ref(0);

async function getPostList() {
    await axios
        .get("http://localhost:8089/post/" + useRouter.params.id)
        .then((response) => {
            // console.log(response.data);
            postList.value = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
const postToUpdate = ref({
    postId: null,
    title: '',
    content: '',
});
async function updatePost(post) {
    console.log("🚀 ~ file: MyPost.vue:157 ~ updatePost ~ post:", post)

    postToUpdate.value = {
        postId: post.postId,
        title: post.title,
        content: post.content,
    };

    await axios
        .patch("http://localhost:8089/post/" + props.user.userId.value + "/" + postToUpdate.value.postId, {
            title: postToUpdate.value.title,
            content: postToUpdate.value.content
        })
        .then((response) => {
            alert(response.data);
        })
        .catch(error => {
            alert(error.data);
        });
}

onMounted(() => {
    // console.log("hhihi");
    initFlowbite();
    getPostList();
});
</script>

<template>
    <h1 class="w-full pb-5 pl-5 text-3xl border-b-2 mb-7 font-brr text-nav-navy">
        작성한 글
    </h1>

    <article class="flex flex-col w-full bg-white border-t-2 rounded-lg border-x-2 lg:w-12/12">
        <div class="flex p-4 border-b-2 bg-ma">
            <div class="justify-center hidden w-2/6 mr-2 md:flex">
                <router-link :to="`/mypage/${props.user.nickName.value}`">
                <img :src="`http://localhost:8089${props.user.profileImgUrl.value}`"
                    class="w-24 h-24 transition duration-200 border-2 rounded-full hover:scale-110 border-nono-mypg-item-border"
                    alt="프로필 이미지" />
                </router-link>
            </div>
            <div class="flex items-center w-5/6">
                <h1 class="text-2xl">
                    <span class="text-3xl font-extrabold text-nono-mypg-item-border">{{ props.user.nickName }}</span>의 글
                </h1>
            </div>
        </div>
        <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg sm:min-w-full">
            <div class="table w-full overflow-hidden text-left text-md">
                <div class="table-header-group font-bold bg-back w-12/12 text-main-blue text-md">
                    <!-- 카테고리 표시 1, 2, 3, 4 각 게시판명으로 변경 -->
                    <div class="min-w-max">
                        <div class="table-cell w-1/6 px-6 py-3">카테고리</div>
                    </div>
                    <!-- 제목 클릭 시 해당 게시글 상세로 이동 -->
                    <div class="table-cell w-2/6 px-6 py-3">제목</div>
                    <div class="hidden w-3/6 px-6 py-3 sm:hidden md:hidden lg:table-cell">
                        본문
                    </div>
                    <div class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </div>
                </div>
                <div class="table-row-group min-w-full">
                    <!-- <th:block
						th:each="post, postStat : ${userPostVO.userPostList}"
					> -->
                    <div v-for="(post) in postList" :key="post.postId"
                        class="table-row h-full text-lg bg-white border-b hover:bg-gray-50 w-12/12">
                        <div class="table-cell px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                            {{ post.boardType }}
                        </div>
                        <!-- th:href="@{|/detail?postId=${post.getPostId()}|}" -->

                        <div class="table-cell px-6 py-4 text-gray-800">
                            <p class="w-48 truncate">
                                {{ post.title }}
                            </p>
                        </div>

                        <div class="hidden px-6 py-4 text-sm text-gray-500 sm:hidden md:hidden lg:table-cell">
                            <p class="truncate w-72">{{ post.content }}</p>
                        </div>
                        <div class="table-cell px-6 py-4 text-right">
                            <button type="button"
                                class="block px-4 py-2 text-sm font-medium text-center text-white text-blue-600 bg-blue-700 rounded-lg hover:cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                :data-modal-target="'modal' + post.postId" :data-modal-toggle="'modal' + post.postId">
                                Edit
                            </button>
                            <!-- 해당 게시글 id 클릭시 modal띄워서 수정하기th:onclick="openModal([[${postStat.count}]]) -->
                        </div>

                        <div :key="post.postId" :id="'modal' + post.postId" tabindex="-1" aria-hidden="true"
                            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div class="relative w-full max-w-2xl max-h-full">
                                <!-- Modal content -->
                                <div class="relative bg-white rounded-lg shadow">
                                    <div class="p-6 space-y-3">
                                        <div class="flex items-start justify-between rounded-t">
                                            <button type="button"
                                                class="inline-flex items-center justify-center w-5 h-5 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900"
                                                :data-modal-hide="'modal' + post.postId">
                                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                    fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                        </div>

                                        <!-- th:action="@{|/api/modify/${userId}/${post.getPostId()}|}" -->

                                        <form>
                                            <div class="relative z-0 w-full mb-2 group">
                                                <!-- <input type="hidden" name="_method" value="PUT" /> -->
                                                <label for="title"
                                                    class="peer-focus:font-medium absolute text-xl text-gray-500 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">제목</label>
                                                <input name="title" type="text" v-model="post.title"
                                                    class="title block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 mb-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                    placeholder="제목을 입력해주세요." required />
                                                <textarea name="content" rows="5" v-model="post.content"
                                                    class="content block p-2.5 w-full text-md text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
                                            </div>
                                            <!-- Modal footer -->
                                            <div
                                                class="flex items-center pt-2 space-x-2 border-t border-gray-200 rounded-b">
                                                <button id="postChgBtn" type="button" @click="updatePost(post)"
                                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                                    수정하기
                                                </button>
                                                <button type="button" :data-modal-hide="'modal' + post.postId"
                                                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                                                    취소하기
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- </th:block> -->
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>
