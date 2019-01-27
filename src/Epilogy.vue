<template>
	<Epilogy :style = "{ width: screenSize + 'px', height: screenSize + 'px' }">
		<BackScreen ref = "backScreen" />

		<Msgbox
			@fade-in:start = "handleFadeIn"
			@fade-out:start = "handleFadeOut" />

		<Menu title = "Main Menu" />
	</Epilogy>
</template>

<style lang = "scss" scoped>
	@import "./styles/variables";

	#{$prefix} {
		position: relative;

		display: flex;
		flex-direction: column;
		margin: 0 auto;

		background: $base-color;
	}
</style>

<script>
	import { updateStoryStatus, updateHeroName, updateHeroineName } from "./stores/actions/Story";
	import { loadConfig } from "./stores/actions/Config";

	import BackScreen from "./components/BackScreen.vue";
	import Menu from "./components/menu/Menu.vue";
	import Msgbox from "./components/Msgbox.vue";

	export default {
		components: { BackScreen, Menu, Msgbox },

		data () {
			return {
				system: {
					width: window.innerWidth,
					height: window.innerHeight
				}
			};
		},

		computed: {
			screenSize () { return Math.min(this.system.width, this.system.height) }
		},

		methods: {
			handleFadeIn () {
				this.$refs.backScreen.startFadeIn();
			},

			handleFadeOut () {
				this.$refs.backScreen.startFadeOut();
			},

			handleResize () {
				this.system.width = window.innerWidth;
				this.system.height = window.innerHeight;
			},
		},

		created () {
			window.addEventListener("resize", this.handleResize);

			loadConfig(this.$store);

			updateHeroName(this.$store, { first: "龍平", last: "小作" });
			updateHeroineName(this.$store, { first: "柚希", last: "石川" });

			updateStoryStatus(this.$store, {
				storymode: 1,
				chapter: 1,
				section: 1,
				dialogueId: 1
			});
		},

		beforeDestroy () {
			window.removeEventListener("resize", this.handleResize);
		}
	};
</script>



<style lang = "scss">
	@import "./styles/variables";

	* {
		box-sizing: border-box;

		&:focus {
			outline: none;
		}
	}

	html {
		font-family: "メイリオ", Meiryo;
	}

	body {
		margin: 0;
	}

	#{$prefix} {
		*::-webkit-scrollbar {
			display: none;
		}
	}
</style>
