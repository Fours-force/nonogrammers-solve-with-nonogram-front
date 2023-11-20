<template>
  <div class="w-6/6 p-6 mx-auto h-6/6 border-4 border-nono-mypg-item-border rounded-lg transition duration-200 hover:scale-105 bg-white">
    <router-link v-bind:to="getNonoDotRouterUrl">
      <img :src="nonoImgUrl"
           alt="" class="w-80 h-80 xl:h-56 xl:w-56 lg:h-72 lg:w-72 md:h-80 md:w-80 object-contain">
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