<template>
	<Epilogy-BackScreen :style = "{ backgroundImage: `url(${attrs.src})` }">
		<Style ref = "styleDom"></Style>
	</Epilogy-BackScreen>
</template>

<style lang = "scss" scoped>
	@import "../styles/variables";

	#{$prefix} {
		&-backscreen {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 1;

			background: transparent center / contain no-repeat;
			background-color: transparent;
			background-blend-mode: overlay;

			transition: background-color 0s 0s linear;
		}
	}
</style>

<script>
	export default {
		data () {
			return {
				attrs: {
					src: this.src
				}
			};
		},

		props: {
			src: { type: String, required: false }
		},

		methods: {
			changeImage (src) {
				this.src = src;
			},

			startTransition (duration, to) {
				const { styleDom } = this.$refs;

				this.$el.style.transitionDuration = `${duration}s`;
				styleDom.innerHTML = `epilogy-backscreen.fade-in { background-color: ${to} }`;

				this.$el.classList.add("fade-in");
			},

			stopTransition () {

			}
		}
	};
</script>
