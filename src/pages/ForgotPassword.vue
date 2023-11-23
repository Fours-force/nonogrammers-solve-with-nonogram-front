<template>
    <div class="flex flex-col justify-center min-h-full px-6 pt-12 pb-5 lg:px-8">
        <Logo></Logo>
        <div class="mt-6 space-y-5 rounded-lg bg-cmt-user-div-bg px-3.5 py-3.5 sm:mx-auto sm:w-full sm:max-w-sm">
            <TextForm 
                v-model:value="email" 
                type="email"
                isAutofocus="true"
                placeholderText="이메일을 입력해 주세요"
                @keyup.enter="sendEmail"
            >
                가입한 이메일 주소를 입력해주세요
            </TextForm>
            <span id="msg" class="text-xs text-red-500"></span>
            <UserSubmitButton @click.once="sendEmail">이메일로 비밀번호 재설정 링크 받기</UserSubmitButton>
        </div>
    </div>
    <div v-if="showLoading" class="flex flex-col place-items-center sm:mx-auto sm:max-w-sm">
        <img src="../assets/images/loadingcat.gif"
        class="my-2 h-40 w-40 rounded-md">
        <span class="font-brr">loading...</span>
    </div>

    <div v-if="showNotify" id="successNotify" class="flex flex-col place-items-center rounded-lg bg-neutral-50 sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="my-2 h-16 w-16" src="../assets/images/user-msg.png" alt="correctEmail" />
        <span class="font-brr">이메일 확인</span>
        <span class="my-2 font-brr text-sm">이메일로 전송된 메일을 확인해 주세요</span>
        <div id="failureMessage" class="my-4 text-xs text-gray-400">
            <a href="/forgot-password" class="text-decoration-line: underline">다시 시도하기</a>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Logo from '@/components/user/UserLogo.vue'
import TextForm from '@/components/user/TextForm.vue'
import UserSubmitButton from '../components/user/UserSubmitButton.vue';
import axios from 'axios';

onMounted(() => {
    const msg = document.getElementById('msg');
});

const email = ref('');
const showLoading = ref(false);
const showNotify = ref(false);
const checkEmailUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_EMAIL_VERIFICATION_API_PATH;

async function sendEmail(){
    if (!email.value.includes('@')) {
        msg.innerText = "이메일을 입력하세요";
    } else if(email.value.includes(' ')) {
        console.log(email.value.includes(' '));
        msg.innerText = "공백은 입력할 수 없습니다";
    } else {
        msg.innerText = "";
        showLoading.value = true;

        var data = new FormData();
        data.append("email", email.value);
        data.append("type", "reset-password");

        await axios.post(checkEmailUrl, data)
        .then((res) => {
            showLoading.value = false;
            showNotify.value = true;
        })
        .catch((err) => {
            showLoading.value = false;
            alert(err.response.data);
        })
    }
};

</script>