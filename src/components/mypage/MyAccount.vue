<template>
    <div class="w-5/12 min-w-fit">
        <h2 class="text-2xl text-opacity-80 text-mypg-border">닉네임</h2>
        <div class="flex justify-around mt-10 bg-white border-2 rounded-lg border-nono-mypg-item-border py-7">
            <div class="flex flex-col px-3">
                <div class="text-gray-300">현재 닉네임</div>
                <div>
                    <span id="showNickName">{{ user.nickName }}</span>
                </div>
            </div>
            <button type="button" data-modal-target="reset-nickname-modal" data-modal-toggle="reset-nickname-modal"
                class="sm:px-3 px-0 md:px-8 py-2.5 mb-2 mr-2 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-lg h-fit focus:outline-none hover:bg-gray-100 hover:text-main-blue focus:z-10 focus:ring-4 focus:ring-gray-100">
                닉네임 변경하기
            </button>

            <!-- Main modal -->
            <div id="reset-nickname-modal" tabindex="-1" aria-hidden="true"
                class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-md max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow">
                        <button type="button" id="offModalBtn"
                            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="reset-nickname-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="px-6 py-6 lg:px-8">
                            <h3 class="mb-4 text-xl font-medium text-gray-900">
                                닉네임 변경하기
                            </h3>
                            <div class="space-y-6">
                                <label for="nickName" class="block mb-2 text-sm font-medium text-gray-900">변경하실 닉네임을
                                    작성해주세요.</label>
                                <div class="flex justify-stretch">
                                    <input type="text" v-model="user.nickName.value" name="nickName" id="nickName"
                                        @change="inputObserve()"
                                        class="w-4/6 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                        placeholder="닉네임을 입력해주세요." required />
                                    <button id="nickNameDupBtn" type="button" value="0"
                                        class="w-2/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        @click="isDuplicatedNickName()">
                                        중복확인
                                    </button>
                                </div>
                                <button id="nickNameChgBtn" data-modal-hide="reset-nickname-modal" disabled="disabled"
                                    type="button"
                                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    @click="changeNickName({ id })">
                                    변경하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});

const changedNickName = ref("");

async function isDuplicatedNickName() {
    await axios
        .post("http://localhost:8089/user/nickname/isduplicated", {
            nickName: props.user.nickName.value.trim(),
        })
        .then((success) => {
            changedNickName.value = success.data;
            alert(
                "'" + success.data + "' 는(은) 사용하실 수 있는 닉네임입니다."
            );
            document.getElementById("nickNameChgBtn").disabled = false;
        })
        .catch((error) => {
            alert(error.response.data);
            document.getElementById("nickNameChgBtn").disabled = true;
        });
}

async function changeNickName() {
    await axios
        .patch("http://localhost:8089/user/nickname/" + props.user.userId.value, {
            nickName: changedNickName.value,
        })
        .then((response) => {
            changedNickName.value = response.data.nickName;
        })
        .catch(error => {
            alert(error.response.data);
        });
}

function inputObserve() {
    document.getElementById("nickNameChgBtn").disabled = true;
}
</script>