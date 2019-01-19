<template>
	<Epilogy :style = "{ width: screenSize + 'px', height: screenSize + 'px' }">
		<Img :src = "null" />

		<Msgbox
			v-bind.sync = "status"
			@seplayer:play = "onSePlay"
			@bgmplayer:play = "onBgmPlay" />

		<Menu title = "Main Menu"></Menu>
	</Epilogy>
</template>

<script>
	import Dialogue from "./models/Dialogue.js";
	import { SEPlayer, BGMPlayer } from "./libs/AudioPlayer";

	import Menu from "./components/Menu.vue";
	import Msgbox from "./components/Msgbox.vue";

	export default {
		components: { Menu, Msgbox },

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

			onSePlay (src) {
				this.system.sePlayer.play(src);
			},

			onBgmPlay (src) {
				this.system.bgmPlayer.play(src);
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

<style lang="scss">
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

<style lang="scss" scoped>
	@import "./styles/variables";

	#{$prefix} {
		position: relative;

		display: block;
		margin: 0 auto;

		> img {
			display: block;
			flex: 1;
		}
	}
</style>
