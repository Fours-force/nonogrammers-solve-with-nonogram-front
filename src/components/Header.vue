<template>
    <div class="bg-white my-2.5">
        <div class="max-w-screen-xl px-1 mx-auto sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-auto">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <button type="button"
                        class="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-controls="mobile-menu" aria-expanded="false">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
                        <svg class="block w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg class="hidden w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex items-center justify-around w-full">
                    <div class="h-auto lg:w-72 md:w-60 sm:min-w-max">
                        <a href="/">
                            <img class="object-contain mx-auto h-28" src="../assets/images/logo.png" alt="Your Company">
                        </a>
                    </div>
                    <div class="hidden w-8/12 sm:block">
                        <div v-if="user != null">
                            <div class="flex items-center justify-end pr-2 h-2/5 sm:static sm:inset-auto sm:pr-0">
                                <span class="relative text-xl leading-normal text-center text-gray-400 font-brr md:w-3/12 sm:w-2/6 sm:min-w-max">{{ user.nickname }}님</span>
                                <!-- Profile dropdown -->
                                <div class="relative">
                                    <div>
                                        <!-- data-dropdown-toggle="dropdown" -->
                                        <button @click="toggleDropdown" type="button"
                                            class="relative flex w-10 h-10 text-sm border-2 rounded-full sm:w-10 focus:border-main-skyblue focus:outline-none focus:ring-main-skyblue focus:ring-offset-2 focus:ring-offset-gray-800"
                                            id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                            <!-- <span class="absolute -inset-1.5"></span> -->
                                            <span class="sr-only">Open user menu</span>
                                            <img class="w-full h-full rounded-full" :src="`${serverUrl}${user.profile}`"
                                                alt="profile-img">
                                        </button>
                                        <div v-if="isDropdown" class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow md:w-40 dark:bg-gray-700">
                                            <ul class="py-2 text-gray-700 text-md font-super256 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <router-link :to="`/mypage/${user.nickname}`">
                                                    <p class="block px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">MYPAGE</p>
                                                    </router-link>
                                                </li>
                                                <li>
                                                    <a @click="logout()" class="block px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">LOGOUT</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="user === null">
                            <div class="flex items-center justify-end pr-2 space-x-4 font-brr h-2/5 sm:static sm:inset-auto sm:pr-0">
                                <a href="/login">로그인</a>
                                <a href="/join">회원가입</a>
                            </div>
                        </div>
                        <div class="flex justify-around w-full mt-3 font-super256 h-3/5">
                            <div class="flex justify-center w-auto h-auto p-1 hover:text-nav-navy active:text-main-skyblue active:rounded-md">
                                <a href="/nonobox" class="block w-auto h-full text-2xl">
                                    <span id="nonobox" class="">NONOBOX</span>
                                </a>
                            </div>
                            <div class="flex justify-center w-auto h-auto p-1 hover:text-nav-navy active:text-main-skyblue active:rounded-md">
                                <a href="https://github.com/Fours-force/nonogrammers-solve-with-nonogram" class="block w-auto h-full text-2xl">
                                    <span class="">SOCIAL</span>
                                </a>
                            </div>
                            <div class="flex justify-center w-auto h-auto p-1 hover:text-nav-navy active:text-main-skyblue active:rounded-md">
                                <a href="/post" class="block w-auto h-full text-2xl">
                                    <span id="community" class="">COMMUNITY</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div class="sm:hidden font-super256">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <a href="/nonobox"
                        class="block px-3 py-2 text-base font-medium rounded-md text-nav-navy hover:bg-gray-700 hover:text-white">NONOBOX</a>
                    <a href="https://github.com/Fours-force/nonogrammers-solve-with-nonogram"
                        class="block px-3 py-2 text-base font-medium rounded-md text-nav-navy hover:bg-gray-700 hover:text-white">SOCIAL</a>
                    <a href="/post"
                        class="block px-3 py-2 text-base font-medium rounded-md text-nav-navy hover:bg-gray-700 hover:text-white">COMMUNITY</a>
                    <div v-if="user != null">
                        <router-link :to="`/mypage/${user.nickname}`">
                            <p
                            class="block px-3 py-2 text-base font-medium rounded-md text-nav-navy hover:bg-gray-700 hover:text-white">MYPAGE</p>
                        </router-link>
                        <a @click="logout()"
                            class="block px-3 py-2 text-base font-medium rounded-md text-nav-navy hover:bg-gray-700 hover:text-white">LOGOUT</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

const isDropdown = ref(false);
const authStore = useAuthStore()
const { user } = storeToRefs(authStore);

const serverUrl = import.meta.env.VITE_SERVER_URL;

function logout() { authStore.logout(); } // 로그아웃
function toggleDropdown() { isDropdown.value = !isDropdown.value; } // 드롭다운 토글 함수

// 드롭다운이 열려있는 상태에서 버튼|링크가 아닌 다른 곳을 클릭하면 드롭다운이 닫힘
onMounted(() => { window.addEventListener('click', closeDropdown); });
function closeDropdown(event) { 
    if (!event.target.closest('button', 'a') && isDropdown.value)
        isDropdown.value = false;
}
</script>