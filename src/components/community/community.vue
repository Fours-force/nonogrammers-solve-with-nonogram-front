<template>
<body class="container">
    <section>
        <div class="bg-back font-brr my-component">
            <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
                <div class="flex justify-around mb-10">
                    <div>
                        <div class="relative w-full h-10">
                        <label for="filterSelect">
<!--                            게시판 종류 표시-->
                            <select v-on:change="changeMenu($event)" v-model="selectedMenu" name="filterSelect" id="filterSelect" class="w-full h-10 pl-2 pr-2 bg-white border border-black rounded-md text-nav-navy">
                                <option value="all" class="text-main-skyblue">전체</option>
                                <option value="notice" class="text-main-skyblue">공지사항</option>
                                <option value="free" class="text-main-skyblue">자유게시판</option>
                                <option value="qa" class="text-main-skyblue">질문/답변</option>
                                <option value="nono" class="text-main-skyblue">전국노노자랑</option>
                            </select>
                        </label>

                        </div>
                    </div>
                    <div>
                        <label for="search" class="relative flex w-full h-10">
                            <!-- 이미지를 검색 필드 안에 넣음 -->
                            <img src="@/assets/images/icon_magnifying glass_.png" alt="Search Icon" class="absolute inset-y-0 left-0 w-6 h-6 my-auto ml-2">
                    
                            <!-- 검색 필드 -->
                            <input type="text" v-model="searchText" @input="handleInput" class="w-full h-10 pl-10 pr-2 font-bold bg-white border border-black rounded-md"
                                name="search" id="search" size="40" placeholder="검색...">
                        </label>
                    </div>
                    <div>
                        <div class="relative w-full h-10">
                            <button class="w-full h-10 text-center text-white duration-300 ease-in-out border rounded-md bg-main-blue pl-7 pr-7 hover:bg-main-skyblue" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                            onclick="window.location.href='/posting'">
                                글 작성
                            </button>
                        </div>
                    </div>
                </div>
                <h2 class="sr-only">Products</h2>
                <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <div v-for="post in posts" :key="post.postId">
                        <a @click="clickDetail(post.postId)" class="group">
                        <div class="w-full h-40 overflow-hidden transition-transform duration-300 ease-in-out transform bg-white rounded-lg shadow-lg aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 group-hover:scale-110 group-hover:opacity-85">
                                    <div class="object-cover object-center w-full h-full">
                                        <h3 class="pl-6 mt-4 text-sm font-bold text-main-blue" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                            <!-- boardType에 따라 게시판 종류 나누기 -->
                                            <span v-if="post.boardType === 1">공지사항</span>
                                            <span v-if="post.boardType === 2">자유게시판</span>
                                            <span v-if="post.boardType === 3">질문/답변</span>
                                            <span v-if="post.boardType === 4">전국노노자랑</span>
                                        </h3>
                                        <div class="flex">
<!--                                            나중에 구현할 거 <img src="/images/new_post_1.png" class="w-3 mt-1.5 ml-3 h-fit profile-image" alt="">-->
<!--                                            <img th:if="${vo.fileUrls.isEmpty() == false}" src="/images/show_image.png" class="w-4 mt-1.5 ml-3 h-4 profile-image" alt="">-->
                                            <p class="pl-3 pr-4 mt-0.5 text-base font-bold text-gray-900" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{post.title}}</p><!-- 제목 -->
                                        </div>
                                        <p class="px-4 mt-1 text-sm text-gray-900" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{post.content}}</p><!-- 내용 -->
                                        <div class="flex items-center">
                                            <img :src="'src/assets'+post.imgSrc" class="mt-1 ml-5 rounded-image" alt=""><!-- 프로필 이미지 -->
                                            <div class="ml-2">
                                                <span class="text-xs">작성자 : {{post.nickName}}</span>
                                                <p class="text-xs text-gray-500">{{post.createdAt}}</p>
                                            </div>

                                        </div>
                                        <div class="flex">
                                            <img src="@/assets/images/image%2012.png" class="h-4 pl-5 mt-1" alt="">
                                            <p class="pl-1 mt-1 text-xs">{{ post.commentCount }}</p><!-- 추천수 표시 -->
                                            <img src="@/assets/images/icon_thumbup_.png" class="object-cover object-center h-3 pl-3 mt-1.5" alt="">
                                            <p class="pl-2 mt-1 text-xs">{{ post.likeCount }}</p><!-- 좋아요수 표시 -->
                                            <div class="ml-auto"> <!-- ml-auto class 추가 -->
                                                <img src="@/assets/images/icon_eye_.png" class="object-cover object-center h-3 pl-3 pr-2 mt-1.5" alt="">
                                            </div>
                                            <span class="pr-4 mt-1 text-xs">{{ post.viewCount }}</span><!-- 조회수 표시 -->
                                        </div>
                                    </div>

                                </div>
                            </a>
                        </div>
                </div>
            </div>
        </div>

    </section>
    <section><!-- 페이징 -->
        <div class="flex items-center justify-between px-4 py-3 sm:px-6 bg-back">
            <div class="flex justify-between flex-1 sm:hidden">
                <a class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Previous</a>
                <a class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Next</a>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div>
                    <nav class="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
                        <a @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-commu-pagination-hover focus:z-20 focus:outline-offset-0" id="previousPage">
                            <span class="sr-only">Previous</span>
                            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                        <a @click="clickPage(0)" :aria-current="currentPage == 0 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 0 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">1</a>
                        <a @click="clickPage(1)" :aria-current="currentPage == 1 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 1 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">2</a>
                        <a @click="clickPage(2)" :aria-current="currentPage == 2 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 2 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">3</a>
                        <a @click="clickPage(3)" :aria-current="currentPage == 3 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 3 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">4</a>
                        <a @click="clickPage(4)" :aria-current="currentPage == 4 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 4 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">5</a>
                        <a @click="clickPage(5)" :aria-current="currentPage == 5 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 5 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">6</a>
                        <a @click="clickPage(6)" :aria-current="currentPage == 6 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 6 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">7</a>
                        <a @click="clickPage(7)" :aria-current="currentPage == 7 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 7 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">8</a>
                        <a @click="clickPage(8)" :aria-current="currentPage == 8 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 8 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">9</a>
                        <a @click="clickPage(9)" :aria-current="currentPage == 9 ? 'page' : null" :class="{ 'hover:bg-commu-pagination-hover': totalPages > 9 }" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 duration-200 ease-in-out ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 page-link">10</a>
                        <a @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-commu-pagination-hover focus:z-20 focus:outline-offset-0" id="nextPage">
                            <span class="sr-only">Next</span>
                            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    
</body>
</template>
<style>
        .page-link[aria-total="page"] {
            background-color: #805959; /* 현재 페이지 버튼의 배경색을 변경 */
        }
        /* 현재 페이지 버튼의 스타일 */
        .page-link[aria-current="page"] {
            background-color: #74DBEF; /* 현재 페이지 버튼의 배경색을 변경 */
            color: #FFFFFF; /* 현재 페이지 버튼의 텍스트 색상을 변경 */
        }
        .rounded-image {
            border-radius: 50%; /* 50%로 설정하여 이미지를 원형으로 만듭니다. */
            width: 30px; /* 이미지의 너비를 설정합니다. */
            height: 30px; /* 이미지의 높이를 설정합니다. */
        }
        .my-component {
            font-family: 'brr';
        }
        @font-face {
            font-family: 'brr';
            src: url('@/assets/fonts/BRR.ttf') format('truetype');
        }
        .container {
            display: flex;
            flex-direction: column;
        }
</style>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: [],
            currentPage: 0,
            totalPages: 1,
            selectedMenu: '전체',
            searchText: '',
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get(`http://localhost:8089/post?page=${this.currentPage}`)
            .then(response => {
                this.posts = response.data.content;
                this.totalPages = response.data.totalPages;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        },
        fetchMenu() {
            axios.get(`http://localhost:8089/post/${this.selectedMenu}`)
            .then(response => {
                this.posts = response.data.content;
                this.totalPages = response.data.totalPages;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        },
        fetchSearch() {
            axios.get(`http://localhost:8089/search?keyword=${this.searchText}`)
            .then(response => {
                this.posts = response.data.content;
                this.totalPages = response.data.totalPages;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage -= 1;
                this.fetchData();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages-1) {
                this.currentPage += 1;
                this.fetchData();
            }
        },
        clickPage(num) {
            if(num < this.totalPages){
                this.currentPage =num;
                this.fetchData();
            }
        },
        changeMenu() {
            this.fetchMenu();
            this.$router.push(`/post/${this.selectedMenu}`);
        },
        handleInput() {
            this.fetchSearch();
            this.$router.push({ path: '/search', query: { keyword: this.searchText } });
        },
        clickDetail(evt){
            console.log(evt);
            this.$router.push({ path: '/detail', query: { postId: evt } });
        }
    },
};
</script>