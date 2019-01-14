<template>
	<Epilogy :style = "{ width: screenSize + 'px', height: screenSize + 'px' }">
		<Img :src = "null" />
		<Dialogs></Dialogs>

		<Menu title = "Main Menu"></Menu>
	</Epilogy>
</template>

<script>
	import Menu from "./components/Menu.vue";
	import Dialogs from "./components/Dialogs.vue";

	export default {
		components: { Menu, Dialogs },

		data () {
			return {
				system: {
					width: window.innerWidth,
					height: window.innerHeight
				},
				
				status: {
					heroName: "",
					heroineName: "",

					storyMode: 1,
					chapter: "",
					section: "",
					dialogueId: 0
				},

				config: {
					locale: ""
				}
			};
		},

		computed: {
			screenSize () { return Math.min(this.system.width, this.system.height) },

			stories () {
				try {
					return require(`./locales/story${ this.status.storyMode }.${ this.config.locale }.json`);
				} catch (error) {
					return require(`./locales/story${ this.status.storyMode }.default.json`);
				}
			},

			dialogues () {
				const { chapter, section } = this.status;

				return this.stories[`${ chapter }${ section ? "." + section : "" }`] || [];
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
			handleResize () {
				this.width = window.innerWidth;
				this.height = window.innerHeight;
			},

			loadConfig () {
				if (!window.localStorage.getItem("epilogy-config")) {
					window.localStorage.setItem("epilogy-config", JSON.stringify(this.config));
				}

				try {
					this.config = JSON.parse(window.localStorage.getItem("epilogy-config"));
				} catch (error) {}
			}
		},

		created () {
			window.addEventListener("resize", this.handleResize);

			this.loadConfig();
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
