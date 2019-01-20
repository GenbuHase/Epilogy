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
			/*position: absolute;
			right: 0;
			bottom: 0;*/

			display: flex;
			flex-direction: column;
			width: 100%;
			height: 37.5vh;
			padding: 1em;

			overflow-wrap: break-word;

			background: $dialog-background-color;
			border: 0.75vh ridge $dialog-border-color;
			
			color: $dialog-text-color;

			transition: opacity 0.1s ease;

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

			&:not([open]) { opacity: 0 }
		}
	}
</style>

<script>
	import Type from "../utils/Type";
	import Sanitizer from "../utils/Sanitizer";

	import SimpleMessage from "./messages/SimpleMessage.vue";
	import PromptMessage from "./messages/PromptMessage.vue";

	export default {
		components: { SimpleMessage, PromptMessage },

		props: {
			chapter: { type: Number },
			section: { type: Number },
			dialogueId: { type: Number }
		},

		computed: {
			dialogue () {
				const { dialogues } = this.$parent;

				return (dialogues && dialogues[this.dialogueId - 1]) || null;
			},

			open () {
				return this.dialogue != null;
			}
		},

		methods: {
			clear () {
				const { simpleMsg, promptMsg } = this.$refs;

				simpleMsg.message = "";
				promptMsg.items = [];
			},

			render (dialogue) {
				const { simpleMsg, promptMsg } = this.$refs;

				if (!dialogue) return this.clear();

				switch (dialogue.type) {
					default:
						this.clear();

						if (dialogue.type === "message") return simpleMsg.message = dialogue.value;
						if (dialogue.type === "prompt") return promptMsg.items = dialogue.value;

					case "fade-in":
					case "fade-out":
						break;
				}
			},

			prev () {
				this.$emit("update:dialogueId", this.dialogueId - 1);
			},

			next () {
				if (!this.dialogue) return;

				this.$emit("seplayer:play", require("../assets/sounds/ok.mp3"));

				if (this.dialogue.type === "message") {
					if (!Type.includeKeys(this.dialogue.label, ["chapter", "section", "dialogue"])) {
						return this.$emit("update:dialogueId", this.dialogueId + 1);
					}

					return Sanitizer.multipleUpdate.call(this, {
						chapter: this.dialogue.label.chapter || this.chapter,
						section: this.dialogue.label.section || this.section,
						dialogueId: this.dialogue.label.dialogue || 1
					});
				}

				if (this.dialogue.type === "prompt") {
					if (!document.activeElement.matches("Epilogy-PromptMessage > Li")) return;

					const currentSelection = this.dialogue.value[document.activeElement.tabIndex - 1];

					if (!Type.includeKeys(currentSelection.label, ["chapter", "section", "dialogue"])) {
						return this.$emit("update:dialogueId", this.dialogueId + 1);
					}

					return Sanitizer.multipleUpdate.call(this, {
						chapter: currentSelection.label.chapter || this.chapter,
						section: currentSelection.label.section || this.section,
						dialogueId: currentSelection.label.dialogue || 1
					});
				}
			},

			handleKeyup (e) {
				if (e.keyCode === 90) this.next();
			}
		},

		created () {
			window.addEventListener("keyup", this.handleKeyup);
		},

		mounted () {
			this.render(this.dialogue);
		},

		beforeDestroy () {
			window.removeEventListener("keyup", this.handleKeyup);
		},

		updated () {
			this.render(this.dialogue);
		}
	};
</script>
