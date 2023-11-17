<template>
    <div>
        <label :for="type" class="block font-brr text-sm leading-6 text-gray-900"><slot></slot></label>
        <div class="mt-2 flex flex-wrap rounded-sm border border-main-skyblue bg-white p-1">
            <input
            v-model="inputData"
            :id="type"
            :type="type"
            :placeholder="placeholderText"
            @input="$emit('update:value', $event.target.value)"
            required
            class="outline-none border-none basis-3/4 rounded-sm py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white sm:text-sm sm:leading-6"
            />
            <!-- 이메일 존재 여부 확인 버튼 -->
            <button type="button" 
            class="text-md basis-1/4 rounded-md border border-main-skyblue bg-main-skyblue font-brr text-white hover:bg-user-chk-btn">
            {{ buttonText }}
            </button>
            <!-- 메세지 -->
            <span id="emailStatus" class="text-xs text-red-500"></span>
        </div>
    </div>
</template>

<script setup>
defineProps(['value', 'type', 'placeholderText', 'buttonText'])
defineEmits(['update:value'])
</script>