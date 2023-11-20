<template>
	<div class="mt-10">
		<h1 class="mb-2 text-2xl text-opacity-80 text-mypg-border">비밀번호</h1>
		<div
			class="flex justify-between w-full bg-white border-2 rounded-lg border-nono-mypg-item-border p-7"
		>
			<div class="flex flex-col px-3">
				<div class="mb-1 text-gray-300">최근 업데이트</div>
				<div><span>{{ user.changedAt }}</span></div>
			</div>
			<a
				href="/forgot-password"
				class="px-5 py-2.5 mb-2 mr-2 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-lg h-fit focus:outline-none hover:bg-gray-100 hover:text-main-blue focus:z-10 focus:ring-4 focus:ring-gray-100"
				>비밀번호 변경</a
			>
		</div>
	</div>
</template>
<script setup>
const props = defineProps({
	user: {
		type: Object,
		required: true,
	},
});
</script>