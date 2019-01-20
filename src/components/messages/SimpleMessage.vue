<template>
	<Epilogy-SimpleMessage>
		<Span v-for = "(char, index) in message" :key = "index">{{ char }}</Span>
	</Epilogy-SimpleMessage>
</template>

<style lang = "scss" scoped>
	@import "../../styles/variables";

	#{$prefix} {
		&-simplemessage {
			display: block;
			white-space: pre-wrap;

			> span {
				opacity: 0;

				&[read] { opacity: 1 }
			}
		}
	}
</style>

<script>
	export default {
		data () {
			return {
				message: "",
				readQues: []
			};
		},

		methods: {
			startReading () {
				const chars = this.$el.children;

				for (const char of chars) char.removeAttribute("read");
				for (let i = 0; i < chars.length; i++) {
					this.readQues[i] = setTimeout(() => {
						this.readQues[i] = null;
						chars[i].setAttribute("read", "");
					}, 50 * i);
				}
			},

			stopReading () {
				for (const que of this.readQues) {
					if (que != null) clearTimeout(que);
				}
			}
		},

		updated () {
			this.stopReading();

			this.$nextTick().then(() => {
				this.startReading();
			});
		}
	};
</script>
