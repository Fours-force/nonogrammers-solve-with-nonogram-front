<template>
	<h1 class="pb-5 pl-5 text-3xl border-b-2 mb-7 font-brr text-nav-navy">
		계정 관리
	</h1>
	<article class="w-12/12">
		<div class="flex justify-between">
			<MyAccountAPI :user="user"></MyAccountAPI>
			<ProfileImgAPI :user="user"></ProfileImgAPI>
		</div>
		<ChangePasswordAPI :user="user"></ChangePasswordAPI>
		<WithDrawUserAPI :user="user"></WithDrawUserAPI>
	</article>
</template>
<script setup>
import MyAccountAPI from "@/components/mypage/MyAccount.vue";
import ProfileImgAPI from "@/components/mypage/ProfileImg.vue";
import ChangePasswordAPI from "@/components/mypage/ChangePassword.vue";
import WithDrawUserAPI from "@/components/mypage/WithDrawUser.vue";

const props = defineProps({
	user: {
        type: Object,
		required: true,
	},
});
// import axios from "axios";
// import { onMounted, ref } from "vue";
// import { useRoute } from "vue-router";

// const currentRouter = useRoute();
// const user = {
// 	userId: ref(currentRouter.params.id),
// 	nickName: ref("테스트닉넴"),
// 	profileImgUrl: ref(""),
// 	changedAt: ref("2023-11-20"),
// };

// onMounted(() => {
// 	getUser();
// });

// async function getUser() {
// 	await axios
// 		.get("http://localhost:8089/user/" + user.nickName.value)
// 		.then((response) => {
// 			const data = response.data;
// 			user.nickName.value = data.nickName;
// 			user.userId.value = data.userId;
// 			user.profileImgUrl.value = data.profileImgUrl;
// 		});
// }
</script>