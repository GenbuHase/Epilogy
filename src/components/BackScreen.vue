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
	import { mapGetters, mapState } from "vuex";
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

		computed: {
			...mapState({
				chapter: state => state.Story.chapter,
				section: state => state.Story.section,
				dialogueId: state => state.Story.dialogueId,
			}),

			...mapGetters({
				dialogue: "Story/dialogue",
			})
		},

		methods: {
			changeImage (src) {
				this.src = src;
			},

			startFadeIn () {
				const { duration, to } = this.dialogue.value;

				this.$el.addEventListener("transitionend", this.endFadeIn);
				this.$el.style.transitionDuration = `${duration}ms`;
				this.$refs.styleDom.innerHTML = `epilogy-backscreen.fade-in { background-color: ${to} }`;

				this.$el.classList.add("fade-in");
			},

			endFadeIn () {
				this.$el.removeEventListener("transitionend", this.endFadeIn);
				this.$el.style.transitionDuration = "";

				const { dialogue } = this;

				if (!Type.includeKeys(dialogue.label, ["chapter", "section", "dialogue"])) {
					return updateStoryStatus(this.$store, { dialogueId: this.dialogueId + 1 });
				}

				return updateStoryStatus(this.$store, {
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

				this.$refs.styleDom.innerHTML = "";
				return updateStoryStatus(this.$store, { dialogueId: this.dialogueId + 1 });
			}
		}
	};
</script>
