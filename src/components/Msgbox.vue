<template>
	<Epilogy-Msgbox :open = "open && ''">
		<SimpleMessage ref = "simpleMsg" />
		<PromptMessage ref = "promptMsg" />
	</Epilogy-Msgbox>
</template>

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
				const { dialogueId } = this.$parent.status;

				return (dialogues && dialogues[dialogueId - 1]) || null;
			},

			open () {
				return this.dialogue != null;
			}
		},

		methods: {
			prev () {
				this.$emit("update:dialogueId", this.dialogueId - 1);
			},

			next () {
				switch (this.dialogue.type) {
					case "message":
						if (!Type.includeKeys(this.dialogue.label, ["chapter", "section", "dialogue"])) return this.$emit("update:dialogueId", this.dialogueId + 1);

						return Sanitizer.multipleUpdate.call(this, {
							chapter: this.dialogue.label.chapter || this.chapter,
							section: this.dialogue.label.section || this.section,
							dialogueId: this.dialogue.label.dialogue || 1
						});

					case "prompt":
						if (!document.activeElement.matches("Epilogy-PromptMessage > Li")) return;

						const currentSelectionDom = document.activeElement;
						const currentSelection = this.dialogue.value[currentSelectionDom.tabIndex - 1];

						if (!Type.includeKeys(currentSelection.label, ["chapter", "section", "dialogue"])) return this.$emit("update:dialogueId", this.dialogueId + 1);

						return Sanitizer.multipleUpdate.call(this, {
							chapter: currentSelection.label.chapter || this.chapter,
							section: currentSelection.label.section || this.section,
							dialogueId: currentSelection.label.dialogue || 1
						});
				}
			},

			initRender () {
				const { simpleMsg, promptMsg } = this.$refs;

				simpleMsg.message = "";
				promptMsg.items = [];
			},

			render (dialogue) {
				const { simpleMsg, promptMsg } = this.$refs;

				const simpleText = [];
				const promptItems = [];

				this.initRender();

				if (!dialogue) return null;
				if (typeof dialogue === "string") return dialogue;

				switch (dialogue.type) {
					case "message":
						if (!Array.isArray(dialogue.value)) return simpleMsg.message = dialogue.value;
						for (const col of dialogue.value) simpleText.push(this.render(col));

						return simpleMsg.message = simpleText.join("\n");
						break;

					case "prompt":
						promptMsg.items = dialogue.value;
						break;
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

<style lang = "scss" scoped>
	@import "../styles/variables";

	#{$prefix} {
		&-msgbox {
			position: absolute;
			right: 0;
			bottom: 0;

			display: flex;
			flex-direction: column;
			width: 100%;
			height: 37.5vh;
			padding: 1em;

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
