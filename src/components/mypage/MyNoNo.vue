<template>
	<div class="w-6/12 mt-2 max:w-8/12 font-brr min-w-min">
		<h1
			class="pb-5 pl-5 text-3xl border-b-2 mb-7 font-brr text-nav-navy"
			th:text="${title}"
		></h1>
		<!-- <th:block th:if="${#lists.isEmpty(nonoList)}"> -->
		<!-- <script>
			window.onload = function () {
				const imgArray = new Array();
				imgArray[0] = "/images/gif/zzang.gif"; //사진
				imgArray[1] = "/images/gif/dgmon.gif"; //사진
				imgArray[2] = "/images/gif/pinggu.gif"; //사진
				imgArray[3] = "/images/gif/psyduck.gif";
				imgArray[4] = "/images/gif/gom.gif";

				const rand = Math.floor(Math.random() * 5);
				const objImg = document.querySelector("#gifImgBox");
				objImg.src = imgArray[rand];
			};
		</script> -->
		<div class="pt-5">
			<h1 class="text-xl font-bold text-center">
				텅 비었습니다.
				<span class="text-lg text-main-blue">노노</span>를 풀러가볼까요?
			</h1>
			<div class="flex justify-center inline mt-4 rounded-full">
				<a href="/nonobox"
					><img
						src=""
						id="gifImgBox"
						class="transition duration-300 rounded-full w-60 h-60 hover:scale-110 hover:shadow-xl"
						alt=""
				/></a>
			</div>
		</div>
		<!-- </th:block> -->
		<article
			class="grid grid-cols-1 gap-y-2 gap-x-2 lg:gap-y-1 lg:gap-x-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-3 xl:gap-y-2"
		>
			<!-- <th:block th:if="${isSolved eq 0}" th:each="nono : ${nonoList}"> -->
			<div
				class="p-6 mx-auto transition duration-200 bg-white border-4 rounded-lg w-6/6 h-60 border-nono-mypg-item-border hover:scale-105"
			>
				<a
					th:href="@{|/nonodots/${session.value.get('userId')}/${nono.nonoId}/${session.value.get('baekjoonUserId')}|}"
					class="h-full mx-auto bg-white"
				>
					<img
						th:src="@{${nono.getNonoImgUrl()}}"
						alt=""
						class="object-contain w-80 h-80 xl:h-48 xl:w-56 lg:h-72 lg:w-72 md:h-80 md:w-80"
					/>
				</a>
			</div>
			<!-- </th:block> -->
			<!-- <th:block th:if="${isSolved eq 1}" th:each="nono : ${nonoList}"> -->
			<div
				class="p-6 mx-auto transition duration-200 bg-white border-4 rounded-lg w-6/6 h-60 border-nono-mypg-item-border hover:scale-105"
			>
				<a
					th:href="@{|/nonodots/${session.value.get('userId')}/${nono.nonoId}/${session.value.get('baekjoonUserId')}|}"
					class="mx-auto bg-white"
				>
					<img
						th:src="@{${nono.getNonoImgUrl()}}"
						alt=""
						class="object-contain w-80 h-80 xl:h-48 xl:w-56 lg:h-72 lg:w-72 md:h-80 md:w-80"
					/>
				</a>
			</div>
			<!-- </th:block> -->
		</article>
	</div>
</template>
<script setup>
</script>