<template>
	<Epilogy :style = "{ width: screenSize + 'px', height: screenSize + 'px' }">
		<BackScreen
			ref = "backScreen"
			v-bind.sync = "status"
			:src = "require('./assets/dialog-background.png')" />

		<Msgbox
			v-bind.sync = "status"
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
	import Dialogue from "./models/Dialogue.js";
	import { SEPlayer, BGMPlayer } from "./libs/AudioPlayer";

	import BackScreen from "./components/BackScreen.vue";
	import Menu from "./components/Menu.vue";
	import Msgbox from "./components/Msgbox.vue";

	export default {
		components: { BackScreen, Menu, Msgbox },

		data () {
			return {
				status: {
					heroName: "",
					heroineName: "",

					storyMode: 1,
					chapter: null,
					section: null,
					dialogueId: null
				},

				system: {
					width: window.innerWidth,
					height: window.innerHeight,

					sePlayer: new SEPlayer(),
					bgmPlayer: new BGMPlayer()
				},

				config: {
					locale: "default",
					readSpeed: 50
				}
			};
		},

		computed: {
			screenSize () { return Math.min(this.system.width, this.system.height) },

			/** @return {Array} */
			stories () {
				try {
					return require(`./stories/story${ this.status.storyMode }.${ this.config.locale }.json`);
				} catch (error) {
					return require(`./stories/story${ this.status.storyMode }.default.json`);
				}
			},

			dialogues () {
				const { chapter, section } = this.status;
				return this.loadDialogues(chapter, section);
			}
		},

		watch: {
			config: {
				handler (newVal, oldVal) {
					window.localStorage.setItem("epilogy-config", JSON.stringify(newVal));
				},

				deep: true
			}
		},

		methods: {
			loadConfig () {
				if (!window.localStorage.getItem("epilogy-config")) {
					window.localStorage.setItem("epilogy-config", JSON.stringify(this.config));
				}

				try {
					this.config = JSON.parse(window.localStorage.getItem("epilogy-config"));
				} catch (error) {}
			},

			loadDialogues (chapter, section) {
				const dialogues = this.stories[`${ chapter }${ section ? ` ${ section }` : "" }`] || [];
				return this.compileDialogues(dialogues);
			},

			compileDialogues (dialogues) {
				const compiledDialogues = [];
				for (const dialogue of dialogues) compiledDialogues.push(Dialogue.compile(dialogue));

				return compiledDialogues;
			},

			handleSePlay (src) {
				this.system.sePlayer.play(src);
			},

			handleBgmPlay (src) {
				this.system.bgmPlayer.play(src);
			},

			handleFadeIn (duration, to) {
				this.$refs.backScreen.startFadeIn(duration, to);
			},

			handleFadeOut (duration) {
				this.$refs.backScreen.startFadeOut(duration);
			},

			handleResize () {
				this.system.width = window.innerWidth;
				this.system.height = window.innerHeight;
			},
		},

		created () {
			window.addEventListener("resize", this.handleResize);

			this.loadConfig();

			this.status.chapter = 1,
			this.status.section = null,
			this.status.dialogueId = 1;
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
