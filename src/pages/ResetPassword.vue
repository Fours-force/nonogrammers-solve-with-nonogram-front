<template>
    <div class="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
        <Logo></Logo>
        <div class="mt-6 space-y-5 rounded-lg bg-cmt-user-div-bg px-3.5 py-3.5 sm:mx-auto sm:w-full sm:max-w-sm">
            <TextForm type="password" placeholderText="영문자, 숫자, 특수문자 포함 최소 8~20자">새 비밀번호</TextForm>
            <TextForm type="password" placeholderText="비밀번호를 확인해주세요">비밀번호 확인</TextForm>
            <UserSubmitButton>비밀번호 변경하기</UserSubmitButton>
        </div>
    </div>
</template>

<script setup>
import Logo from '@/components/user/UserLogo.vue'
import TextForm from '@/components/user/TextForm.vue'
import UserSubmitButton from '../components/user/UserSubmitButton.vue';
</script>