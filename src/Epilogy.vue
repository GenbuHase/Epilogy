<template>
	<Epilogy :style = "{ width: screenSize + 'px', height: screenSize + 'px' }">
		<Canvas Class = "epilogy-gameScreen" :Width = "screenSize" :Height = "screenSize"></Canvas>

		<Menu title = "Main Menu"></Menu>
	</Epilogy>
</template>

<script>
	import Menu from "./components/menu/Menu.vue";

	export default {
		components: { Menu },

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
	* { box-sizing: border-box }

	html,
	body {
		height: 100%;
		margin: 0;
	}
</style>

<style lang="scss" scoped>
	@import "./variables";

	#{$prefix} {
		position: relative;

		display: block;
		margin: 0 auto;

		.#{$prefix}-gameScreen {
			position: absolute;
			background-color: #cccccc;
		}
	}
</style>
