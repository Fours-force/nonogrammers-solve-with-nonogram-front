<template>
    <div class="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
        <Logo></Logo>
        <div class="mt-6 space-y-5 rounded-lg bg-cmt-user-div-bg px-3.5 py-3.5 sm:mx-auto sm:w-full sm:max-w-sm">
            <TextForm v-model:value="email" 
            type="email"
            isAutofocus="true"
            placeholderText="이메일을 입력해 주세요"
            >가입한 이메일 주소를 입력해주세요</TextForm>
            <UserSubmitButton>이메일로 비밀번호 재설정 링크 받기</UserSubmitButton>
        </div>
    </div>

    <div id="successNotify" class="mt-6 flex flex-col place-items-center rounded-lg bg-back sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="my-2 h-16 w-16" src="../assets/images/user-msg.png" alt="correctEmail" />
        <span class="font-brr">이메일 확인</span>
        <span class="my-2 font-brr text-sm">이메일로 전송된 메일을 확인해 주세요</span>
        <div class="my-4 text-xs text-gray-400">
            <span>ⓘ 이메일을 받지 못하셨나요?</span>
            <a href="#" class="text-decoration-line: underline">&nbsp이메일 재전송하기</a>
        </div>
        <div id="successMessage" class="my-4 text-xs text-gray-400">
            <a href="#" class="text-decoration-line: underline">[임시] 비밀번호 변경 링크</a>
        </div>
    </div>

    <div id="failureNotify" class="mt-6 flex flex-col place-items-center rounded-lg bg-back sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="my-2 h-16 w-16" src="../assets/images/user-err-msg.png" alt="errorEmail" />
        <span class="font-brr text-red-500">이메일 전송 실패</span>
        <span class="my-2 mb-4 font-brr text-sm">이메일 주소를 확인해 주세요</span>
        <div id="failureMessage" class="my-4 text-xs text-gray-400">
            <a href="#" class="text-decoration-line: underline">다시 시도하기</a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Logo from '@/components/user/UserLogo.vue'
import TextForm from '@/components/user/TextForm.vue'
import UserSubmitButton from '../components/user/UserSubmitButton.vue';

const email = ref('')
</script>