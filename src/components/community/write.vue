
    <style>
        select {
            appearance: none;
            width: 200px;
            height: 40px;
            background-color: white;
            background-size: 20px;
            padding: 5px 30px 5px 12px;
            border: 1px solid #E2E0E0;
            border-radius: 7px;
            -webkit-border-radius: 7px;
            outline: none;
        }
        #cancelButton{
            background-color: #ffffff;
            border: 1px solid #E2E0E0;
        }
        #submitButton{
            background-color: #3272DD;
            border: 1px solid #ffffff;
        }
        .preview{
            border: 2px solid #E2E0E0;
        }
        .container {
            display: flex;
            flex-direction: column;
        }
    </style>
<template>
<Header></Header>
<body class="container bg-back">

<div class="container flex flex-col max-w-screen-xl mx-auto mt-5 sm:px-6 lg:px-8">
    <!-- <form id="postFile"> -->
    <!--  카테고리  -->
    <div class="flex flex-col space-y-2 font-brr">
        <p>카테고리<span class="text-red-500"> *</span></p>
        <select v-model="selectedMenu" name="category">
            <option value="공지사항">공지사항</option>
            <option value="자유게시판">자유게시판</option>
            <option value="질문답변">질문/답변</option>
            <option value="전국노노자랑">전국노노자랑</option>
        </select>
    </div>

    <!--  유저  -->
    <input type="hidden" id="user" name="userId" v-model="postFormData.userId" th:if="${session.value}" th:value="${session.value.userId}">

    <!--  제목  -->
    <div class="flex flex-col mt-5 space-y-2 font-brr">
        <p>제목<span class="text-red-500"> *</span></p>
        <input type="text" name="title" v-model="postFormData.title" class="py-2 pl-3 border rounded-md border-write-border focus:outline-none" placeholder="제목을 입력해주세요" required>
    </div>
    <!--  내용  -->
    <div class="flex flex-col mt-5 space-y-2 font-brr">
        <p>내용<span class="text-red-500"> *</span></p>
            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                    <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                        <div class="flex items-center space-x-1 sm:pr-4">
                            <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                </svg>
                                <span class="sr-only">Attach file</span>
                            </button>
                            <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                </svg>
                                <span class="sr-only">Embed map</span>
                            </button>
                            <input type="file" id="inputImage" ref="fileInput" @change="previewImages" class="hidden" accept=".png,.jpeg,.jpg" multiple />
                            <button type="button" @click="onClickImageUpload" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                            </svg>
                            <span class="sr-only">Upload image</span>
                            </button>
    
                            <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                    <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z"/>
                                </svg>
                                <span class="sr-only">Format code</span>
                            </button>
                            <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z"/>
                                </svg>
                                <span class="sr-only">Add emoji</span>
                            </button>
                        </div>
                        <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
                            <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"/>
                                </svg>
                                <span class="sr-only">Add list</span>
                            </button>
                            <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
                                </svg>
                                <span class="sr-only">Settings</span>
                            </button>
                            <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z"/>
                                    <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z"/>
                                </svg>
                                <span class="sr-only">Timeline</span>
                            </button>
                            <button type="button" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span class="sr-only">Download</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="px-3 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    <label for="editor" class="sr-only">Publish post</label>
                    <textarea id="editor" v-model="postFormData.content" name="content" rows="15" class="block w-full px-0 text-gray-800 bg-white border-0 text-md focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400" placeholder="내용을 입력해주세요" required></textarea>
                </div>
            </div>
    </div>

    <div id="imageBox" class="flex flex-wrap space-x-3">
        <img
        v-for="(url, index) in imageUrls"
        :key="index"
        :src="url"
        class="box-border object-scale-down mt-3 rounded-lg preview"
        style="width: 100px; height: 100px;"
        />
    </div>

    <div class="flex flex-row mt-3 space-x-4 font-brr ">
        <a href="/post"><button type="button" id="cancelButton" class="items-center py-2 text-center text-black rounded-lg px-9 text-md">
            취소
        </button></a>
        <button id="submitButton" @click="submitForm()" class="items-center py-2 text-center text-white rounded-lg px-9 text-md">
            등록
        </button>
    </div>
    <!-- </form> -->
</div>
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
            userDTOtoFindUserId : {},
            postId: 0,
            postFormData: {
                postId:'',
                boardType:'',
                userId:'',
                title:'',
                content:'',
                createdAt:'',
                updatedAt:'',
                commentCount:'',
                likeCount:'',
                viewCount:'',
                nickName:'',
                imgSrc:'',
                boardTypeStr:''
            },
            selectedMenu: '자유게시판',
            imageUrls: [],
        };
    },
    mounted() {
        this.postId = this.$route.query.postId;
        if(this.postId!==undefined){
            this.fetchData();
        }
        this.getUserId();
        
    },
    methods: {
        fetchData() {
            axios.get(`http://localhost:8089/post/write?postId=${this.postId}`)
            .then(response => {
                // this.posts = response.data.content;
                // this.totalPages = response.data.totalPages;
                this.postFormData.title=response.data.postDTO.title;
                this.postFormData.content=response.data.postDTO.content;
                this.selectedMenu=response.data.postDTO.boardTypeStr;
                console.log(this.postFormData.title);
                console.log(this.postFormData.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        },
        // submitForm(){
        //     this.sendFormDataToServer(this.postFormData);
        // },
        getUserId(){
            try {
                // 예시: 서버에서 사용자 정보를 가져오는 API 호출
                console.log("this.user.nickname : "+this.user.nickname);
                axios.get(`http://localhost:8089/user?nickName=${this.user.nickname}`)
                .then(response => {
                    this.userDTOtoFindUserId = response.data;
                    console.log(this.userDTOtoFindUserId);
                    console.log("userId : "+this.userDTOtoFindUserId.userId);
                    this.postFormData.userId=this.userDTOtoFindUserId.userId;
                    console.log("form : "+this.postFormData.userId);
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
        async sendFormDataToServer(postFormData) {
            try {
                // const postData = {
                //     postDTO: { 
                //         postId:'',
                //         boardType:postFormData.boardType,
                //         userId:1,
                //         title:postFormData.title,
                //         content:postFormData.content,
                //         createdAt:'',
                //         updatedAt:'',
                //         viewCount:'',
                //         nickName:'',
                //         imgSrc:'',
                //         boardTypeStr:''
                //     },
                //     vo: { },
                //     fileDTO: { }
                // };
                // console.log(postData);
                // const response = await axios.post(`http://localhost:8089/post/write`, postData);
                // HTML 파일에서 폼 요소에 접근
                const form = document.querySelector('form');
                    console.log(form);
                // FormData 객체 생성
                const formData = new FormData(form);
                console.log(formData.value);
                // Axios를 사용하여 서버에 데이터 전송
                const response = await axios.post('/post/write', formData);
                console.log(response.data); // 서버의 응답 데이터 출력
                this.$router.push(`/post?page=0`);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
        onClickImageUpload(){
            let inputImageUpload = document.getElementById("inputImage");
            inputImageUpload.click();
        },
        previewImages() {
            const files = this.$refs.fileInput.files;

            // Reset the imageUrls array
            this.imageUrls = [];
            console.log("files : "+files);
            // const container = document.getElementById("imageBox");

            for (let i = 0; i < files.length; i++) {
                const url = URL.createObjectURL(files[i]);
                console.log(url);
                this.imageUrls.push(url);

                // const img = new Image();
                // img.src = url;
                // img.style.width = "100px";
                // img.style.height = "100px";
                // img.classList.add("preview", "object-scale-down", "rounded-lg", "box-border", "mt-3");
                // container.appendChild(img);
            }
        },
        async submitForm() {
            // const profileImgForm = document.querySelector("#postFile");
            const formData = new FormData();
            console.log("1번입니다~")
            const files = this.$refs.fileInput.files;
            // formData.append("profileImg", profileImgForm[0].files[0]);
            // if (profileImgForm[0].files[0] == null) {
            //     alert("선택된 이미지가 없습니다.");
            //     return false;
            // }
            console.log(files.length);
            console.log("2번입니다~")
            if(this.postId!==undefined){
                // Append JSON data
                formData.append('postDTO', new Blob([JSON.stringify({
                    postId: this.postId,
                    boardType: '',
                    userId: this.postFormData.userId,
                    title: this.postFormData.title,
                    content: this.postFormData.content,
                    createdAt: '',
                    updatedAt: '',
                    commentCount: '',
                    likeCount: '',
                    viewCount: '',
                    nickName: '',
                    imgSrc: '',
                    boardTypeStr: ''
                })], { type: 'application/json' }));
            }else{
                // Append JSON data
                formData.append('postDTO', new Blob([JSON.stringify({
                    postId: '',
                    boardType: '',
                    userId: this.postFormData.userId,
                    title: this.postFormData.title,
                    content: this.postFormData.content,
                    createdAt: '',
                    updatedAt: '',
                    commentCount: '',
                    likeCount: '',
                    viewCount: '',
                    nickName: '',
                    imgSrc: '',
                    boardTypeStr: ''
                })], { type: 'application/json' }));
            }
            if(files.length!=0){
                console.log("파일이 있음");
                // Append files
                for (let i = 0; i < files.length; i++) {
                    formData.append('vo', files[i]);
                }
            }else{
                console.log("파일이 없음");
                formData.append('vo', new Blob([], { type: 'multipart/form-data' }));
            }
            

            // Append FileDTO JSON data
            formData.append('fileDTO', new Blob([JSON.stringify({
                fileId: '',
                postId: '',
                filename: '',
                fileExtension: '',
                fileUrl: '',
                createdAt: '',
                statusCode: '',
            })], { type: 'application/json' }));

            formData.append("category", this.selectedMenu);
            // formData.get(f)
            // if (files[0] == null) {
            //     alert("선택된 이미지가 없습니다.");
            //     return false;
            // }
            console.log(this.postFormData.title);
            console.log(this.postFormData.content);
            console.log("요청 전입니다~");
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            };
            console.log(formData);
            // const userId = ref(8);
            if(this.postId!==undefined){
                console.log("수정 버튼");
                await axios
                .post(`http://localhost:8089/post/write`, formData, {
                    headers: {
                        'Content-Type': 'multipart/mixed',
                    },
                })
                .then((response) => {
                    console.log(response)
                    // props.user.profileImgUrl.value = response.data.profileImgUrl;
                })
                .catch((error) => {
                    console.log(error)
                    // alert(error.response.data);
                });
                this.$router.push(`/post`);
            }else{
                console.log("새로 작성 버튼");
                await axios
                .post(`http://localhost:8089/post/write`, formData)
                .then((response) => {
                    console.log(response)
                    // props.user.profileImgUrl.value = response.data.profileImgUrl;
                })
                .catch((error) => {
                    console.log(error)
                    // alert(error.response.data);
                });
                this.$router.push(`/post`);
            }
            // await axios
            //     .post(`http://localhost:8089/post/write`, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/mixed',
            //         },
            //     })
            //     .then((response) => {
            //         console.log(response)
            //         // props.user.profileImgUrl.value = response.data.profileImgUrl;
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //         // alert(error.response.data);
            //     });
            //     this.$router.push(`/post`);
        },
    
    // watch:{
    //     // previewImages
    }
};
</script>