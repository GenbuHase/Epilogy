<template>
	<Epilogy-Msgbox>
		<slot></slot>
	</Epilogy-Msgbox>
</template>

<script>
	export default {
		data () {
			return {

			};
		},

		methods: {
			dismiss () {
				this.$el.remove();
			}
		},

		created () {
			window.addEventListener("keydown", e => {
				if (e.keyCode === 13) this.dismiss();
			});
		}
	};
</script>

<style lang = "scss" scoped>
	@import "../variables";

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
