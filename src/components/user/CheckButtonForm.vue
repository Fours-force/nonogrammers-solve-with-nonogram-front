<template>
    <div>
        <label class="block font-brr text-sm leading-6 text-gray-900"><slot></slot></label>
        <div class="mt-2 flex flex-wrap rounded-sm border border-main-skyblue bg-white p-1">
            <input
            id="input"
            :type="type"
            :placeholder="placeholderText"
            @input="$emit('update:value', $event.target.value)"
            :disabled="isDisabled"
            required
            class="outline-none border-none basis-3/4 rounded-sm py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white sm:text-sm sm:leading-6"
            v-bind:class="{ 'bg-gray-200' : isDisabled }"
            />
            <!-- 확인 및 인증 버튼 -->
            <button 
            id="button"
            @click="$emit('update:buttonEvt', $event.target.value+=1)"
            :disabled="isDisabled"
            class="text-md basis-1/4 rounded-md border  font-brr text-white"
            v-bind:class="{ 'bg-gray-400 border-gray-200' : isDisabled, 'border-main-skyblue bg-main-skyblue hover:bg-user-chk-btn': !isDisabled }">
            {{ buttonText }}
            </button>
            <!-- 메세지 -->
            <span id="emailStatus" class="text-xs text-red-500"></span>
        </div>
    </div>
</template>

<script setup>
defineProps(['value', 'type', 'placeholderText', 'buttonText', 'buttonEvt', 'isDisabled'])
defineEmits(['update:value', 'update:buttonEvt'])
</script>