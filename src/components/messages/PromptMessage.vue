<template>
	<Epilogy-PromptMessage>
		<Li v-for = "(item, index) in items" :key = "index" :tabIndex = "index + 1">{{ item }}</Li>
	</Epilogy-PromptMessage>
</template>

<script>
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
					document.activeElement.previousElementSibling.focus();
				}
			},

			next () {
				if (document.activeElement.nextElementSibling) {
					document.activeElement.nextElementSibling.focus();
				}
			},

			handlekeyup (e) {
				this.initSelection();
				
				if (e.keyCode === 38) this.prev();
				if (e.keyCode === 40) this.next();
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

<style lang="scss" scoped>
	@import "../../styles/variables";

	#{$prefix} {
		&-promptmessage {
			display: block;

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
					}
				}
			}
		}
	}
</style>
