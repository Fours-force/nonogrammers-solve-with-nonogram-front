<style>
    .rounded-image {
        border-radius: 50%; /* 50%로 설정하여 이미지를 원형으로 만듭니다. */
        width: 30px; /* 이미지의 너비를 설정합니다. */
        height: 30px; /* 이미지의 높이를 설정합니다. */
    }
    .container {
            display: flex;
            flex-direction: column;
        }
</style>
<template>
<Header></Header>
<body class="container">
    <section>
        <div class="bg-back font-brr">
            <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
                <div class="grid grid-cols-1 gap-y-16">
                    <div>
                        <div class="flex">
                            <button class="flex w-8 h-8 ml-2 duration-300 ease-in-out rounded-md hover:bg-commu-pagination-hover" onclick="window.location.href = '/post'">
                                <img src="@/assets/images/icon_chevronleft_.png" class="object-cover object-center h-5 mt-1.5 ml-2 w-fit" alt="">
                            </button>
                            <p class="mt-0.5 ml-2 text-base font-semibold leading-7 text-main-blue">{{postDTO.boardTypeStr}}</p>
                        </div>
                        <div class="flex">
                            <img src="@/assets/images/new_post_1.png" class="w-3.5 mt-3.5 ml-3 mr-3 h-fit profile-image" alt="">
                            <h1 class="mt-2 text-2xl font-bold tracking-tight text-nav-navy sm:text-2xl">{{postDTO.title}}</h1>
                        </div>
                        <div class="flex items-center mt-3">
                            <img :src="'src/assets'+postDTO.imgSrc" class="ml-5 rounded-image" alt="">
                            <div class="ml-3">
                                <span class="text-sm text-nav-navy">{{postDTO.nickName}}</span>
                                <p class="text-xs text-commu-time-info">{{postDTO.createdAt}}</p>
                                <div v-if="postDTO.createdAt != postDTO.updatedAt" class="flex text-xs text-commu-time-info">
                                    <p>수정일시 :</p>
                                    <p class="ml-2">{{postDTO.updatedAt}}</p>
                                </div>
                            </div>
                            <form v-if="user != null&&(user.nickname==postDTO.nickName)" id="posEditForm" @submit.prevent="submitForm" method="post">
                                <input type="hidden" name="postId" id="pos_postId_edit" th:value="${pos.postId}">
                                <input type="hidden" name="content" id="pos_content_edit" th:value="${pos.content}">
                                <input type="hidden" name="title" id="pos_title_edit" th:value="${pos.title}">
                                <input type="hidden" name="boardType" id="pos_boardType_edit" th:value="${pos.boardType}">
                                <button type="submit" class="flex h-5 mt-2 ml-3 duration-300 ease-in-out rounded-md w-9 bg-main-skyblue hover:bg-main-blue">
                                    <div class="mt-0.5 ml-2 text-xs text-white">수정</div>
                                </button>
                            </form>
                            <form v-if="user != null&&(user.nickname==postDTO.nickName)" @submit.prevent="deletePost" id="postDeleteForm" action="/postDelete" method="post">
                                <input type="hidden" name="postId" id="pos_postId">
                                <button type="submit" class="flex h-5 mt-2 ml-3 duration-300 ease-in-out rounded-md w-9 bg-main-skyblue hover:bg-main-blue">
                                    <div class="mt-0.5 ml-2 text-xs text-white">삭제</div>
                                </button>
                            </form>
                        </div>
                        <!-- <div th:each="fileUrl : ${pos.getFileUrls()}" class="mt-5 ml-5">
                            <img th:src="@{${fileUrl}}" width="400" alt="">
                        </div> -->
                        <div v-for="file in files" :key="file.fileId">
                            <img :src="`http://localhost:8089${file.fileUrl}`" width="400" alt="">
                        </div>
                        <p class="px-6 mt-6 text-lg leading-8 text-nav-navy">{{postDTO.content}}</p>
                        <div class="flex mt-5">
                            <img src="@/assets/images/icon_eye_.png" class="object-cover object-center h-3 pl-3 mt-1.5" alt="">
                            <span class="pl-1.5 pr-3 mt-1 text-xs">{{postDTO.viewCount}}</span>
                            <img src="@/assets/images/image 12.png" class="h-4 mt-1" alt="">
                            <p class="pl-1 mt-1 text-xs">{{postDTO.commentCount}}</p>
                            <button id="btnLikeCount" class="flex w-10 h-6 ml-2 duration-300 ease-in-out rounded-md hover:bg-commu-pagination-hover" @click="likeItPost()">
                                <img src="@/assets/images/icon_thumbup_.png" class="object-cover object-center h-3 pl-2 mt-1" alt="">
                                <p id="likeCount" class="pl-1 mt-1 text-xs">{{postDTO.likeCount }}</p>
                            </button>
                        </div>
                    </div>
                    <div class="bg-cmt-user-div-bg">
                        <div class="mt-6 ml-10 text-commu-cmt-head">
                            댓글
                        </div>
                        <div v-for="vo in comments" :key="vo.commentId">
                            <div class="mb-5" th:id="'comment-'+${vo.commentId}" v-if="this.formData.commentId!==vo.commentId">
                                <div class="flex mt-2 ml-5">
                                    <img :src="'src/assets'+vo.imgSrc" class="mt-3 ml-3 rounded-image" alt="">
<!--                                    <img src="/images/Rectangle 28.png" class="object-cover object-center h-8 pl-3 mt-3 w-fit" alt="">-->
                                    <div class="mt-2 ml-3">
                                        <span class="text-sm">{{ vo.nickName }}</span>
                                        <div class="flex">
                                            <p class="text-xs text-commu-time-info">{{ formatTimestamp(vo.createdAt) }}</p>
                                            <div v-show="vo.updatedAt!=null" class="flex text-xs text-commu-time-info">
                                                <p class="ml-3">수정일시 :</p>
                                                <p class="ml-2">{{ formatTimestamp(vo.updatedAt) }}</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="px-5 mt-2 text-sm ml-14 mr-7 text-nav-navy">{{ vo.content }}</div>
                                <div class="flex ml-5">
                                    <button class="flex h-5 mt-2 duration-300 ease-in-out rounded-md w-9 ml-14 bg-main-skyblue hover:bg-main-blue"
                                            onclick="location.href='#'">
                                        <img src="@/assets/images/icon_thumbup_(1).png" class="object-cover object-center mt-1 ml-1.5" alt="">
                                        <div class="mt-1 ml-1 text-xs text-white">0</div>
                                    </button>
                                        <button @click="editComment(vo.postId, vo.commentId,vo.content,vo.userId)" v-if="user != null&&(user.nickname==vo.nickName)" class="flex h-5 mt-2 ml-3 duration-300 ease-in-out rounded-md w-9 bg-main-skyblue hover:bg-main-blue" th:onclick="editComment([[${vo.postId}]], [[${vo.commentId}]],[[${vo.content}]])">
                                            <div class="mt-0.5 ml-2 text-xs text-white">수정</div>
                                        </button>
                                    <form @submit.prevent="deleteComment(vo.commentId)" v-if="user != null&&(user.nickname==vo.nickName)" id="deleteCommentForm" method="post">
                                        <input name="commentId" id="commentId" type="hidden">
                                        <!-- <input type="hidden" name="postId" id="postId" th:value="${vo.postId}"> -->
                                        <button type="submit" class="flex h-5 mt-2 ml-3 duration-300 ease-in-out rounded-md w-9 bg-main-skyblue hover:bg-main-blue">
                                            <div class="mt-0.5 ml-2 text-xs text-white">삭제</div>
                                        </button>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <form id="editCmtBox" class="px-5 pt-3" @submit.prevent="editForm" method="post" v-if="DisplayEdit">
                            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                    <input type="hidden" name="postId" th:value="${pos.postId}">
                                    <input type="hidden" id="commId_edit" name="commentId">
                                    <textarea id="content_edit" v-model="formData.content" name="content" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="댓글을 작성해보세요" required></textarea>
                                </div>
                                <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                    <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-main-blue rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-main-skyblue duration-300 ease-in-out">
                                        수정
                                    </button>
                                    <div class="flex pl-0 space-x-1 sm:pl-2">
                                        <button type="button" class="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                            </svg>
                                            <span class="sr-only">Attach file</span>
                                        </button>
                                        <button type="button" class="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                            </svg>
                                            <span class="sr-only">Set location</span>
                                        </button>
                                        <button type="button" class="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                            </svg>
                                            <span class="sr-only">Upload image</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form class="px-5 pt-3" method="post" @submit.prevent="submitCommentForm" id="writeCmtBox" v-else="DisplayEdit">
                            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                        <input type="hidden" name="postId">
                                        <input type="hidden" name="userId" th:if="${session.value}">
                                        <textarea id="content" v-model="formData.content" name="content" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="댓글을 작성해보세요" required></textarea>
                                    </div>
                                <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                    <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-main-blue rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-main-skyblue duration-300 ease-in-out submitButton">
                                        작성
                                    </button>
                                    <div class="flex pl-0 space-x-1 sm:pl-2">
                                        <button type="button" class="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                            </svg>
                                            <span class="sr-only">Attach file</span>
                                        </button>
                                        <button type="button" class="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                            </svg>
                                            <span class="sr-only">Set location</span>
                                        </button>
                                        <button type="button" class="inline-flex items-center justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                            </svg>
                                            <span class="sr-only">Upload image</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>
</template>
<script>
import axios from 'axios';
import Header from '@/components/Header.vue'
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

export default {
    components: {
        Header
    },
    data() {
        const authStore = useAuthStore();
        return {
            user: storeToRefs(authStore).user,
            postDTO: {},
            userDTOtoFindUserId : {},
            comments: [],
            counts: [],
            postId: 0,
            files:[],
            formData: {
                commentId:'',
                postId: this.$route.query.postId,
                userId:'',
                content:'',
                createdAt: '',
                updatedAt: '',
                nickName: '',
                imgSrc: ''
            },
            DisplayEdit: false,
            commentId:0,
            likeCount:0,
            'formData.commentId':'',
        };
    },
    // computed: {
    //     computedLikeCount() {
    //     return this.postDTO.likeCount;
    //     }
    // },
    mounted() {
        
        this.postId = this.$route.query.postId;
        this.fetchData();
        console.log(this.user.nickname);
        this.getUserId();
    },
    methods: {
        fetchData() {
            axios.get(`http://localhost:8089/detail?postId=${this.postId}`)
            .then(response => {
                this.postDTO = response.data.postDTO;
                this.comments = response.data.comments;
                this.counts = response.data.counts;
                this.files = response.data.files;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
            },
        likeItPost(){
            const likeDTO = {
                    postId: this.$route.query.postId,
                    userId: this.formData.userId,
                };
            axios.post('http://localhost:8089/post/like', likeDTO)
            .then(response => {
                console.log(response.data);
                this.postDTO.likeCount = response.data;
                console.log("this.likeCount : "+this.likeCount);
                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


        },
        submitCommentForm() {
            // 폼 데이터를 서버로 전송하는 함수 호출
            this.sendFormDataToServer(this.formData);
        },
        async sendFormDataToServer(formData) {
            try {
                const commentData = {
                    commentId: '',
                    postId: formData.postId,
                    userId: formData.userId,
                    content: formData.content,
                    createdAt: '',
                    updatedAt: '',
                    nickName: '',
                    imgSrc: '',
                };
                console.log(formData);
                const response = await axios.post('http://localhost:8089/detailComment', commentData);
                
                console.log(response.data); 
                this.fetchData();
                formData.content='';
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
        getUserId(){
            try {
                // 예시: 서버에서 사용자 정보를 가져오는 API 호출
                console.log("this.user.nickname : "+this.user.nickname);
                axios.get(`http://localhost:8089/user?nickName=${this.user.nickname}`)
                .then(response => {
                    this.userDTOtoFindUserId = response.data;
                    console.log(this.userDTOtoFindUserId);
                    console.log("userId : "+this.userDTOtoFindUserId.userId);
                    this.formData.userId=this.userDTOtoFindUserId.userId;
                    console.log("form : "+this.formData.userId);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
                console.log("response.data.userId : "+this.userDTOtoFindUserId);
                
                // // 서버 응답에서 userId를 user 객체에 추가
                // this.$set(this.user, 'userId', response.data.userId);

                // // 로컬 스토리지에 업데이트
                // localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
            
        },
        deleteComment(cmt) {
            this.sendFormDataToServerforDelete(cmt);
        },
        async sendFormDataToServerforDelete(cmt) {
            try {
                const commentData = {
                    commentId: cmt,
                    postId: '',
                    userId: '',
                    content: '',
                    createdAt: '',
                    updatedAt: '',
                    nickName: '',
                    imgSrc: '',
                };
                console.log(commentData);
                const response = await axios.post('http://localhost:8089/deleteComment', commentData);
                console.log(response.data);
                this.fetchData();
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
        editComment(postId, commentId,content,userId){
            this.DisplayEdit=true;
            this.formData.postId=postId;
            this.formData.commentId=commentId;
            this.formData.content=content;
            this.formData.userId=userId;
        },
        editForm() {
            this.sendFormDataToServerforEdit(this.formData);
        },
        async sendFormDataToServerforEdit(formData) {
            try {
                const commentData = {
                    commentId: formData.commentId,
                    postId: formData.postId,
                    userId: formData.userId,
                    content: formData.content,
                    createdAt: '',
                    updatedAt: '',
                    nickName: '',
                    imgSrc: '',
                };
                console.log(formData);
                const response = await axios.post('http://localhost:8089/editComment', commentData);
                console.log(3);
                console.log(response.data);
                this.fetchData();
                formData.content='';
                this.DisplayEdit=false;
            } catch (error) {
                console.error('Error submitting form:', error);
            }
            formData.commentId='';
        },
        async deletePost() {
            const response = await axios.get(`http://localhost:8089/postDelete?postId=${this.$route.query.postId}`)
            // axios.get('http://localhost:8089/postDelete', { postId: parseInt(this.$route.query.postId) });
            this.$router.push('/post/all');
            // this.sendFormDataToServerforDeletePost(this.formData);
        },
        async sendFormDataToServerforDeletePost(formData) {
            try {
                const commentData = {
                    commentId: '',
                    postId: this.$route.query.postId,
                    userId: '',
                    content: '',
                    createdAt: '',
                    updatedAt: '',
                    nickName: '',
                    imgSrc: '',
                };
                console.log("postId : "+this.$route.query.postId);
                const response = await axios.get('http://localhost:8089/postDelete', { postId: parseInt(this.$route.query.postId) });
                console.log(response.data);
                this.$router.push('/post/all');
                // this.fetchData();
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
        submitForm(){
            this.$router.push(`/post/write?postId=${this.postId}`);
        }
    },
};
</script>