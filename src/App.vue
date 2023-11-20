<script setup>
    import { onMounted } from 'vue'
    import { initFlowbite } from 'flowbite'

    // initialize components based on data attribute selectors
    onMounted(() => {
        initFlowbite();
    })
</script>

<template>
    <nav>
	<router-link to="/mypage/3">mypage</router-link>
    </nav>
    <br />
    <router-view />
</template>
<!-- 
<style scoped>
</style> -->
