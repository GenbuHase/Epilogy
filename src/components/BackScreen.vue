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
	import { updateStoryStatus } from "../stores/actions/Story";
	
	import Type from "../utils/Type";

	export default {
		data () {
			return {
				attrs: {
					src: this.src
				}
			};
		},

		props: {
			src: { type: String }
		},

		methods: {
			changeImage (src) {
				this.src = src;
			},

			startFadeIn () {
				const { styleDom } = this.$refs;
				const { duration, to } = this.$store.getters.dialogue.value;

				this.$el.addEventListener("transitionend", this.endFadeIn);
				this.$el.style.transitionDuration = `${duration}ms`;
				styleDom.innerHTML = `epilogy-backscreen.fade-in { background-color: ${to} }`;

				this.$el.classList.add("fade-in");
			},

			endFadeIn () {
				this.$el.removeEventListener("transitionend", this.endFadeIn);
				this.$el.style.transitionDuration = "";

				const { dialogue } = this.$store.getters;

				if (!Type.includeKeys(dialogue.label, ["chapter", "section", "dialogue"])) {
					return updateStoryStatus(this.$store, { dialogueId: this.$store.state.Story.dialogueId + 1 });
				}

				return updateStoryStatus(this.$store, {
					chapter: dialogue.label.chapter || this.$store.state.Story.chapter,
					section: dialogue.label.section || this.$store.state.Story.section,
					dialogueId: dialogue.label.dialogue || 1
				});
			},

			startFadeOut () {
				const duration = this.$store.getters.dialogue.value;

				this.$el.addEventListener("transitionend", this.endFadeOut);
				this.$el.style.transitionDuration = `${duration}ms`;

				this.$el.classList.remove("fade-in");
			},

			endFadeOut () {
				this.$el.removeEventListener("transitionend", this.endFadeOut);
				
				const { styleDom } = this.$refs;
				styleDom.innerHTML = "";

				return updateStoryStatus(this.$store, { dialogueId: this.$store.state.Story.dialogueId + 1 });
			}
		}
	};
</script>
