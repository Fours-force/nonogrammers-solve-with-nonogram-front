<template>
    <Header></Header>
	<div
		class="flex justify-center min-h-screen h-[calc(100%-1rem)] w-screen px-1 pt-10 sm:px-6 lg:px-8 mx-auto sm:px-6 lg:px-8 gap-x-2 bg-back"
	>
		<!-- 좌측 nav -->
		<MyPageNavAPI></MyPageNavAPI>
		<!-- <th:block th:replace="~{./my-activity-nav.html :: myactivitynavFragment}"></th:block> -->
		<div class="w-6/12 mt-2 max:w-8/12 font-brr min-w-min">
            <router-view :user="user"/>
            <!-- <Manage :user="user"></Manage> -->
		</div>
	</div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import MyPageNavAPI from "@/components/mypage/MyPageNav.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const currentRouter = useRoute();
const user = {
	userId: ref(currentRouter.params.id),
	nickName: ref("테스트닉넴"),
	profileImgUrl: ref(""),
	changedAt: ref("2023-11-20"),
};

onMounted(() => {
	getUser();
});

async function getUser() {
	await axios
		.get("http://localhost:8089/user/" + user.nickName.value)
		.then((response) => {
			const data = response.data;
			user.nickName.value = data.nickName;
			user.userId.value = data.userId;
			user.profileImgUrl.value = data.profileImgUrl;
		});
}
</script>
