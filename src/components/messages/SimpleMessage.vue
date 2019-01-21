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

				hasRead: true,
				readQues: []
			};
		},

		watch: {
			readQues: {
				handler (newValue, oldValue) {
					this.hasRead = this.readQues.findIndex(que => que != null) === -1 ? true : false;
				},

				immediate: true
			}
		},

		methods: {
			startReading () {
				const chars = this.$el.children;

				for (const char of chars) char.removeAttribute("read");
				for (let i = 0; i < chars.length; i++) {
					this.$set(this.readQues, i, setTimeout(() => {
						this.$set(this.readQues, i, null);

						chars[i].setAttribute("read", "");
						chars[i].scrollIntoView({ behavior: "instant", block: "end" });
					}, 50 * i));
				}
			},

			stopReading () {
				while (this.readQues.length) {
					if (this.readQues[0]) clearTimeout(this.readQues[0]);
					this.$delete(this.readQues, 0);
				}
			},

			skipReading () {
				for (const char of this.$el.children) {
					char.setAttribute("read", "");
				}

				this.stopReading();
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
