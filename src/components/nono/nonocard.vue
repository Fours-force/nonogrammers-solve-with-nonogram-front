<template>
  <div class="p-6 mx-auto transition duration-200 bg-white border-4 rounded-lg w-6/6 h-6/6 border-nono-mypg-item-border hover:scale-105">
    <router-link v-bind:to="getNonoDotRouterUrl">
      <img :src="nonoImgUrl"
           alt="" class="object-contain w-80 h-80 xl:h-56 xl:w-56 lg:h-72 lg:w-72 md:h-80 md:w-80">
    </router-link>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";

    const props = defineProps({
        initialNonoId : Number,
        initialNonoImgUrl : String
    })

    const userId = 1;
    const nonoId = ref(props.initialNonoId);
    const nonoImgUrl = '/src/assets' + props.initialNonoImgUrl;
    const baekjoonId = 'tjdtndlwkd';
    const getNonoDotRouterUrl = computed(() =>{
        return `/nonodots/${userId}/${nonoId.value}/${baekjoonId}`;
    })

</script>

<style scoped>

</style>