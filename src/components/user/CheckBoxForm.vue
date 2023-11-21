<template>
    <label class="font-brr text-sm">
        <input type="checkbox"/><slot></slot>
        <span v-if="isRequired" class="text-red-500">*</span>
    </label>
</template>

<script setup>
defineProps(['isRequired'])
</script>