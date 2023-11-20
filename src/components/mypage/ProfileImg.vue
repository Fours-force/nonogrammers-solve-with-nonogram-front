<template>
	<div class="w-6/12 min-w-fit">
		<h2 class="text-2xl text-opacity-80 text-mypg-border">
			프로필 사진 변경
		</h2>
		<div
			class="flex items-center justify-around p-2 mt-10 sm:mt-10 md:mt-1"
		>
			<div class="hidden mr-3 sm:hidden md:block" id="imgBox">
				<img
					:src="`http://localhost:8089${props.user.profileImgUrl.value}`"
					alt=""
					id="profileImgPreView"
					class="w-40 h-40 transition duration-200 border-2 rounded-full border-nono-mypg-item-border hover:scale-110 hover:shadow-xl"
				/>
			</div>
			<form
				enctype="multipart/form-data"
				id="profileImgFile"
				class="flex flex-col items-center justify-between"
			>
				<input
					name="profileImg"
					class="block w-full mb-5 text-xs text-gray-900 bg-white rounded-lg cursor-pointer focus:outline-none"
					id="profileImgForm"
					type="file"
					accept=".jpg, .png, .jpeg"
					@change="previewImg()"
				/>
				<button
					type="button"
					id="profileImgChgBtn"
					class="w-40 px-3 py-2.5 mt-2 mb-2 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-lg h-fit focus:outline-none hover:bg-gray-100 hover:text-main-blue focus:z-10 focus:ring-4 focus:ring-gray-100"
					@click="changeProfileImg()"
				>
					변경하기
				</button>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
	user: {
		type: Object,
		required: true,
	},
});

// 프로필 사진 변경하기
const profileImgUrl = ref("");

// 이미지 경로를 받아오는 비동기 함수 (예를 들어 API 호출 등)
// const fetchImageUrl = async () => {
// 	// 이미지 경로를 받아오는 비동기 작업 수행
// 	//const imageUrl = await someAsyncOperationToGetImageUrl();
// 	// console.log(profileImgSrc);
// 	// 받아온 이미지 경로를 상태에 저장
// 	otherProjectImageUrl.value =
// 		"933c4b8f-257e-416f-92ba-0176759c46fb_안뇽12.jpeg";
// 	document.getElementById("profileImgPreView").src =
//     baseUrl + otherProjectImageUrl.value;
//     // "/Users/jasonmilian/Downloads/nonogrammers/src/main/resources/static/images/profile/8/ffda32e3-d050-41d1-9aab-33355c80158f_안뇽12.jpeg"
// };

async function changeProfileImg() {
	const profileImgForm = document.querySelector("#profileImgFile");
	const formData = new FormData();

	formData.append("profileImg", profileImgForm[0].files[0]);
	if (profileImgForm[0].files[0] == null) {
		alert("선택된 이미지가 없습니다.");
		return false;
	}

    console.log("🚀 ~ file: ProfileImg.vue:80 ~ changeProfileImg ~ props.user.userId:", props.user.userId);
	await axios
		.post("http://localhost:8089/user/profileimg/3", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => {
            props.user.profileImgUrl.value = "profile" + response.data.profileImgUrl;
		})
		.catch((error) => {
            alert(error.response.data);
        });
}

// 프로필 이미지 변경 시 미리보기
function previewImg() {
	const imgInput = document.querySelector("#profileImgForm");
	const reader = new FileReader();
	reader.onload = ({ target }) => {
		document.querySelector("#profileImgPreView").src = target.result;
	};
	reader.readAsDataURL(imgInput.files[0]);
}
</script>