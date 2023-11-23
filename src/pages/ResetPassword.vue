<template>
    <div class="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
        <Logo></Logo>
        <div class="mt-6 space-y-5 rounded-lg bg-cmt-user-div-bg px-3.5 py-3.5 sm:mx-auto sm:w-full sm:max-w-sm">
            <TextForm 
                type="password"
                v-model:value="password"  
                placeholderText="영문자, 숫자, 특수문자 포함 최소 8~20자"
            >
                새 비밀번호
            </TextForm>
            <TextForm 
                type="password"
                v-model:value="confirmPassword"  
                placeholderText="비밀번호를 확인해주세요"
            >
                비밀번호 확인
            </TextForm>
            <UserSubmitButton @click="changePassword">비밀번호 변경하기</UserSubmitButton>
        </div>
        <span>{{$route.query.token}}</span>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import Logo from '@/components/user/UserLogo.vue'
import TextForm from '@/components/user/TextForm.vue'
import UserSubmitButton from '../components/user/UserSubmitButton.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

onBeforeMount(() => {
    axios.get('http://localhost:8089/api/v1/auth/verify-code?email=' + route.query.email + '&code=' + route.query.code)
    .catch((err) => {
        alert(err.response.data);
        location.href="/";
    })
});

const password = ref('');
const confirmPassword = ref('');

function changePassword() {
    if (password.value === confirmPassword.value) {
        var data = new FormData();
        data.append("email", route.query.email);
        data.append("password", password.value);
        data.append("correctPassword", password.value);

        axios.put('http://localhost:8089/api/v1/auth/reset-password', data, {headers: 
            {'secretCode': import.meta.env.VITE_SECRET_CODE}})
        .then((res) => {
            alert(res.data);
            location.href="/";
        })
        .catch((err) => {
            alert(err.response.data);
        })
    } else {
        alert("비밀번호가 일치하지 않습니다");
    }
}


</script>