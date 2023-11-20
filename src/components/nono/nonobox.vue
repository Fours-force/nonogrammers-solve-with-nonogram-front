<template>
    <body class="bg-back" >
        <div class="flex justify-center w-screen h-full max-w-screen-xl mx-auto sm:px-6 lg:px-8 gap-x-2 ">
            <div class="w-8/12 mt-2 max:w-full font-brr min-w-max">
                <div class="flex justify-between mb-10">
                    <div><a href="/nonobox/1"><img src="@/assets/images/Bronze.png" alt="" class="transition duration-200 hover:scale-105 imgs" /></a></div>
                    <div><a href="/nonobox/2"><img src="@/assets/images/Silver.png" alt="" class="transition duration-200 hover:scale-105 imgs" /></a></div>
                    <div><a href="/nonobox/3"><img src="@/assets/images/Gold.png" alt="" class="transition duration-200 hover:scale-105 imgs" /></a></div>
                    <div><a href="/nonobox/4"><img src="@/assets/images/Platinum.png" alt="" class="transition duration-200 hover:scale-105 imgs" /></a></div>
                </div>

                <article id="NonoListContainer"
                         class="grid grid-cols-1 gap-y-2 gap-x-2 lg:gap-y-1 lg:gap-x-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-3 xl:gap-y-2 mb-5">
                    <div v-for="(nono,nonoIndex) in nonoList" :key="`${nonoIndex}`"
                        >
                        <nonocard :initial-nonoId="nono.nonoId"
                                  :initial-nonoImgUrl="nono.nonoImgUrl"/>
                    </div>
                </article>

              </div>
        </div>
    </body>
</template>

<script setup>
    import {api} from "@/assets/js/common";
    import {computed, onMounted, ref} from "vue";
    import nonocard from "./nonocard.vue";
    
    const props = defineProps({
      userId : Number,
      baekjoonId : String      
    })
    const userId = 1;
    const baekjoonId = 'tjdtndlwkd'
    const nonoList = ref([]);

    onMounted( () => {
        getNonoList();
    })
    const getNonoList = () =>{
        api('http://localhost:8089/nonobox').then((result) => {
            console.log(result);
            nonoList.value = result;
        })
    }

</script>

<style scoped>

</style>