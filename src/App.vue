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
    </nav>
    <br />
    <router-view />
</template>
