<template>
	<div
		class="sticky top-0 hidden mt-3 bg-white border-2 border-solid rounded-lg sm:block min:w-4/12 border-mypage-left-nav h-fit"
	>
		<ul class="w-full p-5 space-y-2 font-medium font-brr">
			<li>
				<p
					class="flex items-center p-2 text-2xl text-gray-900 rounded-md group"
				>
					<span class="ml-3 text-mypg-left-nav">내 활동</span>
				</p>
			</li>
			<li>
				<router-link :to="`/mypage/${props.user.userId.value}`">
					<a
						class="flex items-center p-2 text-lg text-gray-900 rounded-md active:bg-main-skyblue active:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ml-7"
					>
						<span class="flex-1 whitespace-nowrap">계정 관리</span>
					</a>
				</router-link>
			</li>
			<li>
				<router-link :to="`/nono/${props.user.userId.value}/2`">
					<a
						class="flex items-center p-2 text-lg text-gray-900 rounded-md active:bg-main-skyblue active:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ml-7"
					>
						<span class="flex-1 whitespace-nowrap"
							>내가 푼 노노들</span
						>
					</a>
				</router-link>
			</li>
			<li>
				<router-link :to="`/nono/${props.user.userId.value}/1`" :user="user">
					<a
						class="flex items-center p-2 text-lg text-gray-900 rounded-md active:bg-main-skyblue active:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ml-7"
					>
						<span class="flex-1 whitespace-nowrap"
							>내가 풀고있는 노노들</span
						>
					</a>
				</router-link>
			</li>
			<li>
				<router-link :to='`/post/${props.user.userId.value}`' :user="user">
					<a
						class="flex items-center p-2 text-lg text-gray-900 rounded-md active:bg-main-skyblue active:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ml-7"
					>
						<span class="flex-1 whitespace-nowrap">작성한 글</span>
					</a>
				</router-link>
			</li>
		</ul>
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