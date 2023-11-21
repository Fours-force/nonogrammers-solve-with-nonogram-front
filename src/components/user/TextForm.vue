<template>
    <div>
        <label class="block font-brr text-sm leading-6 text-gray-900"><slot></slot></label>
        <input 
        :id="type"
        :type="type"
        :autofocus="isAutofocus"
        :placeholder="placeholderText"
        @input="$emit('update:value', $event.target.value)"
        required
        class="block w-full mt-1 rounded-sm border border-main-skyblue py-2 text-gray-900
        placeholder:text-gray-400 focus:border-main-skyblue focus:outline-none focus:ring-2 focus:ring-main-skyblue sm:text-sm sm:leading-6" 
        />
    </div>
</template>

<script setup>
defineProps(['value', 'type', 'placeholderText', 'isAutofocus'])
defineEmits(['update:value'])
</script>