<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
</script>

<template>
	<div>
	<!-- <router-link to="/">home</router-link>
    <router-link to="/post">comm</router-link> -->
  </div>
  <router-view />
</template>
<!-- 
<style scoped>
header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style> -->

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  display: flex;
  color: #4700fb;
  /* background-color: #96aabe; */
}

nav {
  padding: 30px;
}

nav a {
  /* font-weight: bold; */
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>

