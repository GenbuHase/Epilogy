<template>
	<Epilogy-PromptMessage>
		<Li v-for = "(item, index) in items" :key = "index" :tabIndex = "index + 1">
			<Span>{{ item.message }}</Span>
		</Li>
	</Epilogy-PromptMessage>
</template>

<style lang = "scss" scoped>
	@import "../../styles/variables";

	#{$prefix} {
		&-promptmessage {
			display: block;
			flex: 1;

			li {
				list-style: none;

				margin-left: 2em;
				line-height: 2;

				text-shadow: 2px 2px 2.5px $accent-color;

				&:focus {
					&::before {
						content: "▶";
						
						display: inline;
						margin: 0 1em 0 -2em;

						text-shadow: none;

						animation: prompt-selection 0.6s linear infinite alternate;

						@keyframes prompt-selection {
							0% { opacity: 0 }
							100% { opacity: 1 }
						}
					}
				}
			}
		}
	}
</style>

<script>
	import { playSE } from "../../stores/actions/Audio";

	export default {
		data () {
			return {
				items: []
			};
		},

		methods: {
			initSelection () {
				if (!document.activeElement.matches("Epilogy-PromptMessage > Li")) {
					if (this.$el.firstElementChild) this.$el.firstElementChild.focus();
				}
			},

			prev () {
				if (document.activeElement.previousElementSibling) {
					playSE(this.$store, require("../../assets/sounds/cursor.mp3"));
					document.activeElement.previousElementSibling.focus();
				}
			},

			next () {
				if (document.activeElement.nextElementSibling) {
					playSE(this.$store, require("../../assets/sounds/cursor.mp3"));
					document.activeElement.nextElementSibling.focus();
				}
			},

			handlekeyup (e) {
				this.initSelection();
				
				if (e.keyCode === 38) return this.prev();
				if (e.keyCode === 40) return this.next();
			},
		},

		created () {
			window.addEventListener("keyup", this.handlekeyup);
		},

		beforeDestroy () {
			window.removeEventListener("keyup", this.handlekeyup);
		}
	};
</script>
