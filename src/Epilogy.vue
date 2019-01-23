<template>
	<Epilogy :style = "{ width: screenSize + 'px', height: screenSize + 'px' }">
		<BackScreen
			ref = "backScreen"
			:src = "require('./assets/dialog-background.png')" />

		<Msgbox
			v-bind.sync = "status"
			:dialogue = "dialogue"
			@seplayer:play = "handleSePlay"
			@bgmplayer:play = "handleBgmPlay"
			@fade-in:start = "handleFadeIn"
			@fade-out:start = "handleFadeOut" />

		<Menu title = "Main Menu"></Menu>
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
	import BackScreen from "./components/BackScreen.vue";
	import Menu from "./components/Menu.vue";
	import Msgbox from "./components/Msgbox.vue";

	import { updateStoryStatus } from "./stores/actions/Story";

	import {
		loadConfig,
		updateConfig
	} from "./stores/actions/Config";

	import { SEPlayer, BGMPlayer } from "./libs/AudioPlayer";

	export default {
		components: { BackScreen, Menu, Msgbox },

		data () {
			return {
				system: {
					width: window.innerWidth,
					height: window.innerHeight,

					sePlayer: new SEPlayer(),
					bgmPlayer: new BGMPlayer()
				}
			};
		},

		computed: {
			screenSize () { return Math.min(this.system.width, this.system.height) }
		},

		methods: {
			handleSePlay (src) {
				this.system.sePlayer.play(src);
			},

			handleBgmPlay (src) {
				this.system.bgmPlayer.play(src);
			},

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
</style>
