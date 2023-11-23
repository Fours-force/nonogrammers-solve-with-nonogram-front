<template>
    <div>
        <div class="flex items-center justify-between">
            <label class="block font-brr text-sm leading-6 text-gray-900"><slot></slot></label>
            <a href="/forgot-password" tabindex="-1" class="font-brr text-sm text-main-blue hover:text-user-home-btn">Forgot password?</a>
        </div>
        <input 
        type="password"
        :value="password"
        :placeholder="placeholderText"
        @input="$emit('update:password', $event.target.value)"
        required
        class="block w-full mt-1 rounded-sm border border-main-skyblue py-2 text-gray-900 focus:border-main-skyblue focus:outline-none focus:ring-2 focus:ring-main-skyblue sm:text-sm sm:leading-6" 
            />
    </div>
</template>

<script setup>
defineProps(['password', 'placeholderText'])
defineEmits(['update:password'])
</script>