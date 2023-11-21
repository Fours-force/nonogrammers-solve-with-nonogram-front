<template>
    <Header></Header>
    <body class="bg-back" >
        <div class="flex justify-center w-screen h-full max-w-screen-xl mx-auto sm:px-6 lg:px-8 gap-x-2 ">
            <div class="w-8/12 mt-2 max:w-full font-brr min-w-max">
                <div class="flex justify-between mb-10">
                    <div @click="changeList(1)"><img src="@/assets/images/Bronze.png" alt="" class="transition duration-200 hover:scale-105 imgs" /></div>
                    <div @click="changeList(2)"><img src="@/assets/images/Silver.png" alt="" class="transition duration-200 hover:scale-105 imgs" /></div>
                    <div @click="changeList(3)"><img src="@/assets/images/Gold.png" alt="" class="transition duration-200 hover:scale-105 imgs" /></div>
                    <div @click="changeList(4)"><img src="@/assets/images/Platinum.png" alt="" class="transition duration-200 hover:scale-105 imgs" /></div>
                </div>

                <article id="NonoListContainer"
                         class="grid grid-cols-1 mb-5 gap-y-2 gap-x-2 lg:gap-y-1 lg:gap-x-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-3 xl:gap-y-2">
                    <div v-for="(nono,nonoIndex) in nonoList" :key="`${nonoIndex}`"
                        >
                        <nonocard :initial-nonoId="nono.nonoId"
                                  :initial-nonoImgUrl="nono.nonoImgUrl"
                                  :initial-user-id="userId"
                                  :initial-baekjoon-id="baekjoonId"/>
                    </div>
                </article>

              </div>
        </div>
    </body>
</template>

<script setup>
    import {api} from "@/js/common.js";
    import {computed, onMounted, ref} from "vue";
    import nonocard from "./nonocard.vue";
    import Header from "@/components/Header.vue";
    import { useAuthStore } from '@/stores/auth.store';
    import { storeToRefs } from 'pinia';
    
    const nonoList = ref([]);
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore);
    const userId = ref(0);
    const baekjoonId = ref('');
    console.log(user.value.nickname);
    const nicknamedata = {userNickname : user.value.nickname};

    onMounted( () => {
        getNonoList();
        getUserId();
    })
    const getNonoList = async () =>{
        await api(`http://localhost:8089/nonobox`,'GET').then((result) => {
            console.log(result);
            nonoList.value = result;
        })
    }

    const changeList = (num) =>{
      api(`http://localhost:8089/nonobox/${num}`,'GET').then((result) => {
        console.log(result);
        nonoList.value = result;
      })
    }

    const getUserId = () => {
        api(`http://localhost:8089/getUserIdAndBaekjoonId`,'POST',nicknamedata).then((result) => {
            console.log(user.value.nickname);
            userId.value = result.userId; 
            baekjoonId.value = result.baekjoonId;
        })
    }

</script>

<style scoped>

</style>