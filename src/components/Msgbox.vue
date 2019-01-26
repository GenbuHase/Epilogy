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
			height: 37.5vh;
			padding: 1em;

			overflow-y: auto;
			overflow-wrap: break-word;

			background: $dialog-background-color;
			border: 0.75vh ridge $dialog-border-color;
			
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
	import { updateStoryStatus } from "../stores/actions/Story";
	import { playSE } from "../stores/actions/Audio";

	import SimpleMessage from "./messages/SimpleMessage.vue";
	import PromptMessage from "./messages/PromptMessage.vue";

	import Type from "../utils/Type";
	import Sanitizer from "../utils/Sanitizer";

	export default {
		components: { SimpleMessage, PromptMessage },

		computed: {
			open () {
				return this.$store.getters.dialogue != null;
			}
		},

		methods: {
			clear () {
				const { simpleMsg, promptMsg } = this.$refs;

				this.$el.scrollTo(0, 0);
				this.$el.removeAttribute("read");
				
				simpleMsg.message = "";
				simpleMsg.readSpeed = null;
				promptMsg.items = [];
			},

			render () {
				const { simpleMsg, promptMsg } = this.$refs;
				const { dialogue } = this.$store.getters;

				if (!dialogue) return this.clear();
				this.$el.removeAttribute("read");

				switch (dialogue.type) {
					default:
						this.clear();

						if (dialogue.type === "message") {
							simpleMsg.readSpeed = dialogue.readSpeed;
							
							if (typeof dialogue.value === "string") return simpleMsg.message = dialogue.value;
							if (Array.isArray(dialogue.value)) return simpleMsg.message = dialogue.value.join("\n");
						}

						if (dialogue.type === "prompt") return promptMsg.items = dialogue.value;

						break;

					case "fade-in":
						return this.$emit("fade-in:start");
					case "fade-out":
						return this.$emit("fade-out:start");
				}
			},

			prev () {
				updateStoryStatus(this.$store, { dialogueId: this.$store.state.Story.dialogueId - 1 });
			},

			next () {
				const { simpleMsg } = this.$refs;
				const { dialogue } = this.$store.getters;

				if (!dialogue) return;

				if (dialogue.type === "message") {
					if (!simpleMsg.hasRead) return simpleMsg.skipReading();

					playSE(this.$store, require("../assets/sounds/read.mp3"));
					
					if (!Type.includeKeys(dialogue.label, ["chapter", "section", "dialogue"])) {
						return updateStoryStatus(this.$store, { dialogueId: this.$store.state.Story.dialogueId + 1 });
					}

					return updateStoryStatus(this.$store, {
						chapter: dialogue.label.chapter || this.$store.state.Story.chapter,
						section: dialogue.label.section || this.$store.state.Story.section,
						dialogueId: dialogue.label.dialogue || 1
					});
				}

				if (dialogue.type === "prompt") {
					if (!document.activeElement.matches("Epilogy-PromptMessage > Li")) return;

					playSE(this.$store, require("../assets/sounds/ok.mp3"));

					const currentSelection = dialogue.value[document.activeElement.tabIndex - 1];

					if (!Type.includeKeys(currentSelection.label, ["chapter", "section", "dialogue"])) {
						return updateStoryStatus(this.$store, { dialogueId: this.$store.state.Story.dialogueId + 1 });
					}

					return updateStoryStatus(this.$store, {
						chapter: currentSelection.label.chapter || this.$store.state.Story.chapter,
						section: currentSelection.label.section || this.$store.state.Story.section,
						dialogueId: currentSelection.label.dialogue || 1
					});
				}
			},

			handleKeyup (e) {
				if (e.keyCode === 88) this.prev();
				if (e.keyCode === 90) this.next();
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
