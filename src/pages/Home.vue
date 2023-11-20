<template>
    <Header></Header>
    <div class="bg-main-bg">
        <div class="max-w-screen-xl flex h-screen items-center justify-center mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col font-brr place-content-center items-center">
                <p class="text-main-text md:text-5xl">당신만의 pixel 캐릭터</p>
                <p class="text-main-sm-text text-xl mt-2">지루했던 코딩테스트 문제를 재미있게 풀어봐요</p>
                <img src="../assets/images/home-logo.png">
                <button type="button" onclick="location.href='/nonobox'" class="button text-md w-44 rounded-xl bg-user-home-btn px-7 py-2 mt-2 font-brr text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">색칠하러 가기 →</button>   
            </div>
            <div class="place-content-center items-center">
                <img src="../assets/images/home-tuxi.png">
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>