<template>
    <div class="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
        <Logo></Logo>
        <div class="mt-6 space-y-5 rounded-lg bg-cmt-user-div-bg px-3.5 py-3.5 sm:mx-auto sm:w-full sm:max-w-sm">
            <CheckButtonForm type="email" v-model:value="vars.email" 
                placeholderText="이메일을 입력해주세요" buttonText="이메일 인증">이메일</CheckButtonForm>
            <CheckButtonForm type="text" v-model:value="vars.baekjoonUserId" 
                placeholderText="백준 아이디를 입력해주세요" buttonText="백준 확인">백준 아이디</CheckButtonForm>
            <CheckButtonForm type="text" v-model:value="vars.nickName" 
                placeholderText="닉네임을 입력해주세요" buttonText="중복 확인">닉네임</CheckButtonForm>
            <TextForm type="password" v-model:value="vars.password" 
                placeholderText="&nbsp영문자, 숫자, 특수문자 포함 최소 8~20자">비밀번호</TextForm>
            <TextForm type="password" v-model:value="vars.correctPassword" 
                placeholderText="&nbsp비밀번호를 확인해주세요">비밀번호 확인</TextForm>
            <div class="flex flex-col space-y-1">
                <CheckBoxForm isRequired="true">&nbsp개인정보 수집 및 이용 약관 동의</CheckBoxForm>
                <CheckBoxForm>&nbsp[선택] 마케팅 활용 동의 및 알림 수신 동의</CheckBoxForm>
            </div>
            <UserSubmitButton @click="join">회원가입</UserSubmitButton>
        </div>
        <Or></Or>
        <UserFooter></UserFooter>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router/index.js'

import Logo from '@/components/user/UserLogo.vue'
import TextForm from '../components/user/TextForm.vue';
import CheckButtonForm from '@/components/user/CheckButtonForm.vue'
import CheckBoxForm from '@/components/user/CheckBoxForm.vue'
import UserSubmitButton from '../components/user/UserSubmitButton.vue';
import Or from '@/components/user/Or.vue'
import UserFooter from '@/components/user/UserFooter.vue'
import axios from 'axios';

const joinUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_JOIN_API_PATH

const vars = ref(
    {
        email: '',
        baekjoonUserId: '',
        nickName: '',
        password: '',
        correctPassword: '',
    }
)

async function join(){
    await axios.post(joinUrl, vars.value)
        .then((res) => {
            alert("환영합니다! 회원가입이 완료되었습니다!")
            router.push('/login');
        })
        .catch((err) => {
            alert("회원가입에 실패했습니다. 다시 시도해주세요.")
        })
}
</script>