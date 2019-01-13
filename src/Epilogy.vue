<template>
	<Epilogy :style = "{ width: screenSize + 'px', height: screenSize + 'px' }">
		<Menu title = "Main Menu"></Menu>

		<Msgbox>
			〇〇<Br />
			「テストメッセージ」
		</Msgbox>
	</Epilogy>
</template>

<script>
	import Menu from "./components/Menu.vue";
	import Msgbox from "./components/Msgbox.vue";

	export default {
		components: { Menu, Msgbox },

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

	html {
		font-family: "メイリオ", Meiryo;
	}

	body {
		margin: 0;
	}
</style>

<style lang="scss" scoped>
	@import "./variables";

	#{$prefix} {
		position: relative;

		display: block;
		margin: 0 auto;
	}
</style>
