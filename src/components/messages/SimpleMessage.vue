<template>
	<Epilogy-Msgbox-SimpleMessage>
		<Span v-for = "(char, index) in message" :key = "Date.now() + '' + index">{{ char }}</Span>
	</Epilogy-Msgbox-SimpleMessage>
</template>

<style lang="scss" scoped>
	@import "../../styles/variables";

	#{$prefix} {
		&-msgbox-simplemessage {
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
