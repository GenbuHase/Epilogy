<template>
	<Epilogy-SimpleMessage>
		<Span v-for = "(char, index) in message" :key = "index">{{ char }}</Span>
	</Epilogy-SimpleMessage>
</template>

<script>
	export default {
		data () {
			return {
				message: ""
			};
		},

		updated () {
			this.$nextTick().then(() => {
				const chars = this.$el.children;

				(function looper (index) {
					setTimeout(() => {
						chars[index].setAttribute("read", "");
						if (index < chars.length - 1) looper(++index);
					}, 50);
				})(0);
			});
		}
	};
</script>

<style lang="scss" scoped>
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
