<template>
    <Header></Header>
	<div
		class="flex justify-center min-h-screen h-[calc(100%-1rem)] w-screen px-1 pt-10 sm:px-6 lg:px-8 mx-auto sm:px-6 lg:px-8 gap-x-2 bg-back"
	>
		<!-- 좌측 nav -->
		<MyPageNavAPI :user="myUser"></MyPageNavAPI>
		<div class="w-6/12 mt-2 max:w-8/12 font-brr min-w-min">
            <router-view :user="myUser"/>
		</div>
	</div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import MyPageNavAPI from "@/components/mypage/MyPageNav.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

const currentRouter = useRoute();
const authStore = useAuthStore()
const { user } = storeToRefs(authStore);

const myUser = {
    userId: ref(0),
	nickName: ref(""),
	profileImgUrl: ref(""),
    nonoList: ref(Array),
    postList: ref(Array),
    baekjoonUserId : ref(""),
	changedAt: ref(Date),
}

async function getUser() {
    await axios
    .get("http://localhost:8089/user/" + user.value.nickname)
    .then((response) => {
        const data = response.data;
        myUser.nickName.value = data.nickName;
        myUser.userId.value = data.userId;
        myUser.baekjoonUserId.value = data.baekjoonUserId;
        myUser.profileImgUrl.value = data.profileImgUrl;
        myUser.changedAt.value = data.changedAt;
    });    
}

onMounted(() => {
    getUser();
});
</script>
