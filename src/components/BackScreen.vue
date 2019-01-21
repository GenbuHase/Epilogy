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
	import Type from "../utils/Type";
	import Sanitizer from "../utils/Sanitizer";

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
			dialogue: { type: Object },

			src: { type: String }
		},

		methods: {
			changeImage (src) {
				this.src = src;
			},

			startFadeIn () {
				const { styleDom } = this.$refs;
				const { duration, to } = this.dialogue.value;

				this.$el.addEventListener("transitionend", this.endFadeIn);
				this.$el.style.transitionDuration = `${duration}ms`;
				styleDom.innerHTML = `epilogy-backscreen.fade-in { background-color: ${to} }`;

				this.$el.classList.add("fade-in");
			},

			endFadeIn () {
				this.$el.removeEventListener("transitionend", this.endFadeIn);
				this.$el.style.transitionDuration = "";

				const { dialogue } = this;

				if (!Type.includeKeys(dialogue.label, ["chapter", "section", "dialogue"])) {
					return this.$emit("update:dialogueId", this.dialogueId + 1);
				}

				return Sanitizer.multipleUpdate.call(this, {
					chapter: dialogue.label.chapter || this.chapter,
					section: dialogue.label.section || this.section,
					dialogueId: dialogue.label.dialogue || 1
				});
			},

			startFadeOut () {
				const duration = this.dialogue.value;

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
