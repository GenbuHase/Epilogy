<template>
	<Epilogy-MenuPanel>
		<slot />
	</Epilogy-MenuPanel>
</template>

<style lang="scss" scoped>
	@import "../../styles/variables";

	#{$prefix} {
		&-menupanel {
			position: absolute;
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>

<script>
	export default {
		
	}
</script>
