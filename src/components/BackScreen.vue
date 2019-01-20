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

			src: { type: String, required: false }
		},

		methods: {
			changeImage (src) {
				this.src = src;
			},

			startFadeIn (dialogue) {
				const { styleDom } = this.$refs;
				const { duration, to } = dialogue.value;

				this.$el.addEventListener("transitionend", () => this.endFadeIn(dialogue));
				this.$el.style.transitionDuration = `${duration}ms`;
				styleDom.innerHTML = `epilogy-backscreen.fade-in { background-color: ${to} }`;

				this.$el.classList.add("fade-in");
			},

			endFadeIn (dialogue) {
				this.$el.removeEventListener("transitionend", () => this.endFadeIn(dialogue));
				this.$el.style.transitionDuration = "";

				if (!Type.includeKeys(dialogue.label, ["chapter", "section", "dialogue"])) {
					return this.$emit("update:dialogueId", this.dialogueId + 1);
				}

				return Sanitizer.multipleUpdate.call(this, {
					chapter: dialogue.label.chapter || this.chapter,
					section: dialogue.label.section || this.section,
					dialogueId: dialogue.label.dialogue || 1
				});
			},

			startFadeOut (dialogue) {
				const { duration } = dialogue.value;

				this.$el.addEventListener("transitionend", () => this.endFadeOut(dialogue));
				this.$el.style.transitionDuration = `${duration}ms`;

				this.$el.classList.remove("fade-in");
			},

			endFadeOut (dialogue) {
				this.$el.removeEventListener("transitionend", () => this.endFadeOut(dialogue));

				const { styleDom } = this.$refs;
				styleDom.innerHTML = "";

				this.$emit("update:dialogueId", this.dialogueId + 1);
			}
		}
	};
</script>
