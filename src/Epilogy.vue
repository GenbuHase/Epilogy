<template>
	<Epilogy :style = "{ width: screenSize + 'px', height: screenSize + 'px' }">
		<BackScreen
			ref = "backScreen"
			v-bind.sync = "status"
			:dialogue = "dialogue"
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

	import Dialogue from "./models/Dialogue";
	import { SEPlayer, BGMPlayer } from "./libs/AudioPlayer";

	import { updateStoryStatus } from "./stores/actions/Story";

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
			},

			dialogue () {
				const { dialogues } = this;
				return (dialogues && dialogues[this.status.dialogueId - 1]) || null;
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

			this.loadConfig();

			updateStoryStatus(this.$store, {
				storymode: 1,
				chapter: 1,
				section: 1,
				dialogueId: 1
			});
			
			this.status.chapter = 1,
			this.status.section = 1,
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
