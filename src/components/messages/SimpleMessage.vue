<template>
	<Epilogy-SimpleMessage>
		<Transition-Group>
			<Span v-for = "(char, index) in message" :key = "index">{{ char }}</Span>
		</Transition-Group>
	</Epilogy-SimpleMessage>
</template>

<script>
	export default {
		data () {
			return {
				message: ""
			};
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../styles/variables";

	#{$prefix} {
		&-simplemessage {
			display: block;
			white-space: pre-wrap;
		}
	}
</style>
