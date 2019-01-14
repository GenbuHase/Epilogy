<template>
	<Epilogy-Msgbox :open = "open && ''">
		<SimpleMessage ref = "simpleMsg" />
		<PromptMessage ref = "promptMsg" />
	</Epilogy-Msgbox>
</template>

<script>
	import SimpleMessage from "./messages/SimpleMessage.vue";
	import PromptMessage from "./messages/PromptMessage.vue";

	export default {
		components: { SimpleMessage, PromptMessage },

		computed: {
			dialogue () {
				const { dialogues } = this.$parent;
				const { dialogueId } = this.$parent.status;

				return (dialogues && dialogues[dialogueId - 1]) || null;
			},

			message () {
				return this.dialogueToMessage(this.dialogue);
			},

			open () {
				return this.dialogue != null;
			}
		},

		methods: {
			prev () {
				this.$parent.status.dialogueId--;
			},

			next () {
				if (this.dialogue.type === "message") {
					if (!this.dialogue.label) return this.$parent.status.dialogueId++;

					const { chapter, section, dialogue } = this.dialogue.label;

					this.$parent.status = Object.assign(this.$parent.status, {
						chapter: chapter || this.$parent.status.chapter,
						section: section || this.$parent.status.section,
						dialogueId: dialogue || 1
					});
				} else if (this.dialogue.type === "prompt") {
					if (!document.activeElement.matches("Epilogy-PromptMessage > Li")) return;

					const currentSelectionDom = document.activeElement;
					const currentSelection = this.dialogue.value[currentSelectionDom.tabIndex - 1];

					if (!Array.isArray(currentSelection)) return this.$parent.status.dialogueId++;

					const { chapter, section, dialogue } = currentSelection[1];

					this.$parent.status = Object.assign(this.$parent.status, {
						chapter: chapter || this.$parent.status.chapter,
						section: section || this.$parent.status.section,
						dialogueId: dialogue || 1
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

			dialogueToMessage (dialogue) {
				const formatted = [];

				if (!dialogue) return null;
				if (typeof dialogue === "string") return dialogue;

				switch (dialogue.type) {
					case "message":
						if (!Array.isArray(dialogue.value)) return dialogue.value;

						for (const col of dialogue.value) {
							formatted.push(this.dialogueToMessage(col));
						}

						break;

					case "prompt":
						for (const item of dialogue.value) {
							if (!Array.isArray(item)) {
								formatted.push(`▶　${ item }`);
								continue;
							}

							const { chapter, section } = item[1];
							formatted.push(`▶　${ item[0] } → ${ chapter ? `${ chapter }章` : "" }${ section ? `${ section }節` : "" }${ item[1].dialogue ? `${ item[1].dialogue }メッセージ目` : "" }`);
						}

						break;
				}

				return formatted.join("\n");
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

			display: block;
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
