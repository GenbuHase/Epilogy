<template>
	<Epilogy-Msgbox v-html = "Array.isArray(message) ? message.join('<Br />') : message">
		<SimpleMessage />
		<PromptMessage />
	</Epilogy-Msgbox>
</template>

<script>
	import SimpleMessage from "./messages/SimpleMessage.vue";
	import PromptMessage from "./messages/PromptMessage.vue";

	export default {
		components: { SimpleMessage, PromptMessage },

		computed: {
			message () {
				const { dialogues } = this.$parent;
				const { dialogueId } = this.$parent.status;

				return (dialogues && dialogues[dialogueId - 1]) || "";
			}
		},

		methods: {
			dismiss () {
				this.$el.remove();
			},

			prev () {
				this.$parent.status.dialogueId--;
			},

			next () {
				this.$parent.status.dialogueId++;
			},
		},

		created () {
			window.addEventListener("keydown", e => {
				if (e.keyCode === 38) this.prev();
				if (e.keyCode === 40) this.next();
			});
		},

		mounted () {
			this.$parent.status.chapter = 1;

			console.log(this.$parent.dialogues);
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

			&::after {
				content: "▼";

				position: absolute;
				right: 2vmin;
				bottom: 2vmin;

				animation: dialog-indicator 0.75s linear infinite alternate;

				@keyframes dialog-indicator {
					0% { opacity: 0 }
					100% { opacity: 1 }
				}
			}
		}
	}
</style>
