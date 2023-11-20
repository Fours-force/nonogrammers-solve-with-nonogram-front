<template>
    <div class="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
        <Logo></Logo>
        <div class="mt-6 space-y-5 rounded-lg bg-cmt-user-div-bg px-3.5 py-3.5 sm:mx-auto sm:w-full sm:max-w-sm">
            <TextForm v-model:value="email" type="email" isAutofocus="true">이메일</TextForm>
            <PasswordForm v-model:password="password" @keyup.enter="submit" >비밀번호</PasswordForm>
            <UserSubmitButton @click="submit">로그인</UserSubmitButton>
        </div>
        <Or></Or>
        <p class="mt-3 text-center font-brr text-sm text-gray-500 sm:mx-auto sm:w-full sm:max-w-sm"> 계정이 없으신가요?
        <a href="/join" class="font-brr leading-6 text-main-blue hover:text-user-home-btn">회원가입</a>
        </p>
        <UserFooter></UserFooter>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Logo from '@/components/user/UserLogo.vue'
import TextForm from '@/components/user/TextForm.vue'
import PasswordForm from '@/components/user/PasswordForm.vue'
import UserSubmitButton from '@/components/user/UserSubmitButton.vue'
import Or from '@/components/user/Or.vue'
import UserFooter from '@/components/user/UserFooter.vue'
import { useAuthStore } from '@/stores/auth.store'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()

function submit() { authStore.login(email.value, password.value); }

</script>

