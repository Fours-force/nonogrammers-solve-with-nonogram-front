<template>
<div>
    <button @click="$emit('submit')"
        type="submit"
        class="text-md flex w-full justify-center rounded-lg bg-main-blue px-3 py-2 font-brr leading-6 text-white shadow-sm hover:bg-user-home-btn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <slot></slot>
    </button>
</div>
</template>