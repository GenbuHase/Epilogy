<template>
	<Epilogy-SimpleMessage>{{ message }}</Epilogy-SimpleMessage>
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
			white-space: pre;
		}
	}
</style>
