<template>
	<Canvas Class = "epilogy" :Width = "screenSize" :Height = "screenSize">
		<Menu></Menu>
	</Canvas>
</template>

<script>
	import Menu from "./components/menu/Menu.vue";

	export default {
		components: {
			Menu
		},

		data () {
			return {
				width: window.innerWidth,
				height: window.innerHeight
			};
		},

		computed: {
			screenSize () { return Math.min(this.width, this.height) }
		},

		methods: {
			handleResize () {
				this.width = window.innerWidth;
				this.height = window.innerHeight;
			}
		},

		created () {
			window.addEventListener("resize", this.handleResize);
		},

		beforeDestroy () {
			window.removeEventListener("resize", this.handleResize);
		}
	};
</script>

<style lang="scss">
	@import "./common";
</style>

<style lang="scss" scoped>
	@import "./variables";

	.#{$prefix} {
		display: block;
		margin: 0 auto;
	}
</style>
