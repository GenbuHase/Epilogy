<template>
	<Epilogy-PromptMessage>
		<Li v-for = "(item, index) in items" :key = "index" :tabIndex = "index + 1">
			<Span v-for = "(char, index) in item.message" :key = "index">{{ char }}</Span>
		</Li>
	</Epilogy-PromptMessage>
</template>

<style lang = "scss" scoped>
	@import "../../styles/variables";
	@import "../../styles/mixins";

	#{$prefix} {
		&-promptmessage {
			display: block;
			flex: 1;

			li {
				@include selectable;

				list-style: none;

				margin-left: 2em;
				line-height: 2;

				> span {
					opacity: 0;

					&[read] { opacity: 1 }
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
				if (this.items.length === 0) return;
				this.initSelection();

				switch (e.keyCode) {
					case 38:
						return this.prev();
					case 40:
						return this.next();
				}
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
