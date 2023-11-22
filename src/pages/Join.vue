<template>
    <div class="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
        <Logo></Logo>
        <div class="mt-6 space-y-5 rounded-lg bg-cmt-user-div-bg px-3.5 py-3.5 sm:mx-auto sm:w-full sm:max-w-sm">
                <CheckButtonForm 
                    type="email"
                    v-model:value="vars.email" 
                    v-model:buttonEvt="emailButton"
                    placeholderText="이메일을 입력해주세요" 
                    buttonText="이메일 인증"
                    :isDisabled="isDisabled"
                >
                    이메일
                </CheckButtonForm>
                <span id="emailMsg" class="text-xs text-red-500"></span>

                <div v-if="showLoading" class="flex flex-col place-items-center sm:mx-auto sm:max-w-sm">
                    <img src="../assets/images/loading.gif" class="my-2 h-40 w-40 rounded-md">
                    <span class="font-brr">loading...</span>
                </div>
                <CheckButtonForm 
                    type="text" 
                    v-if="showToken"
                    v-model:value="vars.emailCode" 
                    v-model:buttonEvt="emailCodeButton" 
                    placeholderText="인증번호를 입력해주세요" 
                    buttonText="확인"
                >
                </CheckButtonForm>
                <!-- <span id="numberMsg" v-if="showToken" class="text-xs text-red-500"></span> -->

                <CheckButtonForm 
                    type="text" 
                    v-model:value="vars.baekjoonUserId" 
                    v-model:buttonEvt="baekjoonButton"
                    placeholderText="백준 아이디를 입력해주세요" 
                    buttonText="백준 확인"
                >
                    백준 아이디
                </CheckButtonForm>
                <span id="idMsg" class="text-xs text-red-500"></span>

                <CheckButtonForm 
                    type="text" 
                    v-model:value="vars.nickName" 
                    v-model:buttonEvt="nicknameButton"
                    placeholderText="닉네임을 입력해주세요"
                    buttonText="중복 확인"
                >
                    닉네임
                </CheckButtonForm>
                <span id="nicknameMsg" class="text-xs text-red-500"></span>

                <TextForm 
                    type="password" 
                    v-model:value="vars.password" 
                    placeholderText="&nbsp영문자, 숫자, 특수문자 포함 최소 8~20자"
                >
                    비밀번호
                </TextForm>

                <TextForm 
                    type="password" 
                    v-model:value="vars.correctPassword" 
                    placeholderText="&nbsp비밀번호를 확인해주세요"
                >
                    비밀번호 확인
                </TextForm>
                <span id="pwMsg" class="text-xs text-red-500"></span>

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
import { onMounted, ref, watch } from 'vue'
import router from '@/router/index.js'

import Logo from '@/components/user/UserLogo.vue'
import TextForm from '../components/user/TextForm.vue';
import CheckButtonForm from '@/components/user/CheckButtonForm.vue'
import CheckBoxForm from '@/components/user/CheckBoxForm.vue'
import UserSubmitButton from '../components/user/UserSubmitButton.vue';
import Or from '@/components/user/Or.vue'
import UserFooter from '@/components/user/UserFooter.vue'
import axios from 'axios';

// API URL
const joinUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_JOIN_API_PATH
const checkEmailUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_EMAIL_VERIFICATION_API_PATH
const checkEmailCodeUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_VERIFY_CODE_API_PATH
const checkBaekjoonUserIdUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_CHECK_BAEKJOON_API_PATH
const checkNickNameUrl = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_CHECK_NICKNAME_API_PATH

// 반응형 변수
const showToken = ref(false)
const isDisabled = ref(false)
const showLoading = ref(false);
const emailButton = ref(0)
const emailCodeButton = ref(0)
const baekjoonButton = ref(0)
const nicknameButton = ref(0)

// message DOM
onMounted(() => {
    let emailMsg = document.getElementById("emailMsg");
    // let numberMsg = document.getElementById("numberMsg");
    let idMsg = document.getElementById("idMsg");
    let nicknameMsg = document.getElementById("nicknameMsg");
    let pwMsg = document.getElementById("pwMsg");
})

const vars = ref(
    {
        email: '',
        baekjoonUserId: '',
        nickName: '',
        password: '',
        correctPassword: '',
        emailCode: '',
    }
)

const check = ref(
    {
        emailCheck: false,
        bjCheck: false,
        nickCheck: false,
    }
)

// 버튼 클릭 이벤트 함수
async function join(){
    if (!checkAlg(pwMsg, vars.value.password)){
        if (!(check.value.emailCheck && check.value.bjCheck && check.value.nickCheck)) {
            alert("모든 인증을 완료해주세요!");
        } else {
            if (checkPassword(vars.value.password, vars.value.correctPassword)){
                await axios.post(joinUrl, vars.value)
                .then((res) => {
                    alert("환영합니다! 회원가입이 완료되었습니다!")
                    router.push('/login');
                })
                .catch((err) => {
                    alert(err.data);
                })
            };
    }
}
}

// 이메일 인증 메일 전송
watch(emailButton, async (newVal) => {

    if (!vars.value.email.includes('@')) {
        emailMsg.innerText = "이메일을 입력하세요";
    } else {
        var data = new FormData();
        data.append("email", vars.value.email);
        data.append("type", "join");
        showLoading.value = true;

        await axios.post(checkEmailUrl, data)
            .then((res) => {
                showLoading.value = false;
                isDisabled.value = true;
                showToken.value = true;
                emailMsg.innerText = "5분 이내로 입력하세요";
            })
            .catch((err) => {
                alert(err.response.data);
            })
        }
})

// 인증번호 확인
watch(emailCodeButton, async (newVal) => {

    var data = new FormData();
    data.append("email", vars.value.email);
    data.append("code", vars.value.emailCode);

    await axios.post(checkEmailCodeUrl, data)
        .then((res) => {
            alert("인증이 완료되었습니다")
            showToken.value = false;
            check.value.emailCheck = true;
        })
        .catch((err) => {
            check.value.emailCheck = false;
            alert(err.response.data);
        })
    }
)

// 백준 아이디 확인
watch(baekjoonButton, async (newVal) => {

    if (!checkAlg(idMsg, vars.value.baekjoonUserId)) {

        let baekjoonCheck = checkBaekjoonUserIdUrl + "?id=" + vars.value.baekjoonUserId
        console.log(baekjoonCheck)

        await axios.get(baekjoonCheck)
            .then((res) => {
                idMsg.innerText = "사용 가능한 백준 아이디입니다"
                check.value.bjCheck = true; 
            })
            .catch((err) => {
                check.value.bjCheck = false; 
                idMsg.innerText = err.response.data;
            })
        }
})

// 닉네임 확인
watch(nicknameButton, async (newVal) => {

    if (!checkAlg(nicknameMsg, vars.value.nickName)) {

    let nicknameCheck = checkNickNameUrl + "?nickname=" + vars.value.nickName

    await axios.get(nicknameCheck)
        .then((res) => {
            nicknameMsg.innerText = "사용 가능한 닉네임입니다"
            check.value.nickCheck = true; 
        })
        .catch((err) => {
            check.value.nickCheck = false; 
            nicknameMsg.innerText = err.response.data;
        })
    }
})

function checkAlg(msg, value){
    if (isEmptyString(value)){
        msg.innerText = "값을 입력해주세요";
        return true;
    } else if (isSpaceCharacter(value)){
        msg.innerText = "공백은 입력할 수 없습니다";
        return true;
    } else {
        return false;
    }
}

function isEmptyString(value){
    if (value.trim() == "")
        return true;
    else
        return false;
}

function isSpaceCharacter(value){
    if (value.includes(' '))
        return true;
    else
        return false;
}

function checkPassword(password, confirmPassword){
    if (password != confirmPassword){
        alert("비밀번호가 일치하지 않습니다");
        return false;
    } else {
        return true;
    }
}


</script>