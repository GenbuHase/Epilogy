<template>
	<Epilogy-Msgbox :open = "open && ''">
		<SimpleMessage ref = "simpleMsg" />
		<PromptMessage ref = "promptMsg" />
	</Epilogy-Msgbox>
</template>

<style lang = "scss" scoped>
	@import "../styles/variables";

	#{$prefix} {
		&-msgbox {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 37.5vmin;
			padding: 1em;

			overflow-y: auto;
			overflow-wrap: break-word;

			background: $dialog-background-color;
			border: 0.75vmin ridge $dialog-border-color;
			user-select: none;
			
			color: $dialog-text-color;

			transition: opacity 0.1s ease;

			&[read] {
				&::after {
					content: "▼";

					position: absolute;
					right: 2vmin;
					bottom: 2vmin;

					animation: msgbox-indicator 0.75s linear infinite alternate;

					@keyframes msgbox-indicator {
						0% { opacity: 0 }
						100% { opacity: 1 }
					}
				}
			}

			&:not([open]) { opacity: 0 }
		}
	}
</style>

<script>
	import { mapGetters, mapState } from "vuex";

	import { updateStoryStatus } from "../stores/actions/Story";
	import { playSE } from "../stores/actions/Audio";

	import SimpleMessage from "./messages/SimpleMessage.vue";
	import PromptMessage from "./messages/PromptMessage.vue";

	import Type from "../utils/Type";

	const readSpeed = 50;

	export default {
		components: { SimpleMessage, PromptMessage },

		data () {
			return {
				hasRead: false,
				readQues: { simple: [], prompt: [] }
			};
		},

		computed: {
			...mapState({
				chapter: state => state.Story.chapter,
				section: state => state.Story.section,
				dialogueId: state => state.Story.dialogueId,
			}),

			...mapGetters({
				dialogue: "Story/dialogue",
			}),

			open () {
				return this.dialogue != null;
			}
		},

		watch: {
			hasRead (newValue) {
				switch (newValue) {
					case true:
						return this.$el.setAttribute("read", "");
					case false:
						return this.$el.removeAttribute("read");
				}
			}
		},

		methods: {
			initToRender () {
				const { simpleMsg, promptMsg } = this.$refs;

				simpleMsg.message = "";
				promptMsg.items = [];

				this.hasRead = false;
				this.$el.scrollTo(0, 0);
			},

			render () {
				const { simpleMsg, promptMsg } = this.$refs;
				const { dialogue } = this;

				this.initToRender();
				if (!dialogue) return;

				if (["fade-in", "fade-out"].includes(dialogue.type)) {
					return this.$emit(`${dialogue.type}:start`);
				}

				switch (dialogue.type) {
					case "message":
						if (typeof dialogue.value === "string") simpleMsg.message = dialogue.value;
						if (Array.isArray(dialogue.value)) simpleMsg.message = dialogue.value.join("\n");
						break;

					case "prompt":
						promptMsg.items = dialogue.value;
						break;
				}

				this.$nextTick().then(() => this.startToRead());
			},
			
			initToRead () {
				const { simpleMsg, promptMsg } = this.$refs;

				for (const char of simpleMsg.$el.children) char.removeAttribute("read");
				for (const item of promptMsg.$el.children) {
					for (const char of item.children) char.removeAttribute("read");
				}

				this.hasRead = false;
				this.$set(this, "readQues", { simple: [], prompt: [] });
			},

			startToRead () {
				const { simpleMsg, promptMsg } = this.$refs;
				
				this.initToRead();

				new Promise(resolve => {
					const chars = simpleMsg.$el.children;
					if (!chars.length) return resolve();

					for (let i = 0; i < chars.length; i++) {
						this.$set(this.readQues.simple, i, setTimeout(() => {
							this.$set(this.readQues.simple, i, null);

							chars[i].setAttribute("read", "");
							chars[i].scrollIntoView({ behavior: "instant", block: "end" });

							if (i == chars.length - 1) return resolve();
						}, readSpeed * i));
					}
				}).then(() => {
					const items = Array.prototype.map.call(promptMsg.$el.children, item => item.children);
					
					return new Promise(resolve => {
						return (function looper (itemId) {
							const chars = items[itemId];
							if (!chars) return resolve();
							
							for (let i = 0; i < chars.length; i++) {
								this.$set(this.readQues.prompt, i, setTimeout(() => {
									this.$set(this.readQues.prompt, i, null);

									chars[i].setAttribute("read", "");
									chars[i].scrollIntoView({ behavior: "instant", block: "end" });

									if (i == chars.length - 1) looper.call(this, ++itemId);
								}, readSpeed * i));
							}
						}).call(this, 0);
					});
				}).then(() => this.afterReading());
			},

			afterReading () {
				while (this.readQues.simple.length) {
					if (this.readQues.simple[0]) clearTimeout(this.readQues.simple[0]);
					this.$delete(this.readQues.simple, 0);
				}

				while (this.readQues.prompt.length) {
					if (this.readQues.prompt[0]) clearTimeout(this.readQues.prompt[0]);
					this.$delete(this.readQues.prompt, 0);
				}

				this.hasRead = true;
			},

			skipReading () {
				const { simpleMsg, promptMsg } = this.$refs;

				for (let i = 0; i < simpleMsg.$el.children.length; i++) {
					const char = simpleMsg.$el.children[i];
					char.setAttribute("read", "");

					if (i === simpleMsg.$el.children.length - 1) char.scrollIntoView({ behavior: "instant", block: "end" });
				}

				for (const chars of Array.prototype.map.call(promptMsg.$el.children, item => item.children)) {
					for (let i = 0; i < chars.length; i++) {
						const char = chars[i];
						char.setAttribute("read", "");

						if (i === chars.length - 1) char.scrollIntoView({ behavior: "instant", block: "end" });
					}
				}

				this.afterReading();
			},

			prev () {
				updateStoryStatus(this.$store, { dialogueId: this.dialogueId - 1 });
			},

			next () {
				const { dialogue } = this;

				if (!dialogue || ["fade-in", "fade-out"].includes(dialogue.type)) return;
				if (!this.hasRead) return this.skipReading();

				if (dialogue.type === "message") {
					playSE(this.$store, require("../assets/sounds/read.mp3"));
					
					if (!Type.includeKeys(dialogue.label, ["chapter", "section", "dialogue"])) {
						return updateStoryStatus(this.$store, { dialogueId: this.dialogueId + 1 });
					}

					return updateStoryStatus(this.$store, {
						chapter: dialogue.label.chapter || this.chapter,
						section: dialogue.label.section || this.section,
						dialogueId: dialogue.label.dialogue || 1
					});
				}

				if (dialogue.type === "prompt") {
					if (!document.activeElement.matches("Epilogy-PromptMessage > Li")) return;

					playSE(this.$store, require("../assets/sounds/ok.mp3"));

					const currentSelection = dialogue.value[document.activeElement.tabIndex - 1];

					if (!Type.includeKeys(currentSelection.label, ["chapter", "section", "dialogue"])) {
						return updateStoryStatus(this.$store, { dialogueId: this.dialogueId + 1 });
					}

					return updateStoryStatus(this.$store, {
						chapter: currentSelection.label.chapter || this.chapter,
						section: currentSelection.label.section || this.section,
						dialogueId: currentSelection.label.dialogue || 1
					});
				}
			},

			handleKeyup (e) {
				switch (e.keyCode) {
					case 88:
						return this.prev();
					case 90:
						return this.next();
				}
			}
		},

		created () {
			window.addEventListener("keyup", this.handleKeyup);
		},

		mounted () {
			this.render();
		},

		beforeDestroy () {
			window.removeEventListener("keyup", this.handleKeyup);
		},

		updated () {
			this.render();
		}
	};
</script>
