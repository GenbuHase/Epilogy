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
				message: ""
			};
		}
	};
</script>
