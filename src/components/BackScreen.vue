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

			transition: background-color 0ms 0ms linear;
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
			chapter: { type: Number },
			section: { type: Number },
			dialogueId: { type: Number },

			src: { type: String, required: false }
		},

		methods: {
			changeImage (src) {
				this.src = src;
			},

			startFadeIn (duration, to) {
				const { styleDom } = this.$refs;

				this.$el.addEventListener("transitionend", this.endFadeIn);
				this.$el.style.transitionDuration = `${duration}ms`;
				styleDom.innerHTML = `epilogy-backscreen.fade-in { background-color: ${to} }`;

				this.$el.classList.add("fade-in");
			},

			endFadeIn () {
				this.$el.removeEventListener("transitionend", this.endFadeIn);
				this.$el.style.transitionDuration = "";

				this.$emit("update:dialogueId", this.dialogueId + 1);
			},

			startFadeOut (duration) {
				this.$el.addEventListener("transitionend", this.endFadeOut);
				this.$el.style.transitionDuration = `${duration}ms`;

				this.$el.classList.remove("fade-in");
			},

			endFadeOut () {
				this.$el.removeEventListener("transitionend", this.endFadeOut);

				const { styleDom } = this.$refs;
				styleDom.innerHTML = "";

				this.$emit("update:dialogueId", this.dialogueId + 1);
			}
		}
	};
</script>
