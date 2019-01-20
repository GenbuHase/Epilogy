<template>
	<Epilogy-BackScreen>
		<Img :src = "src" />
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

			img { height: 100% }
		}
	}
</style>

<script>
	export default {
		props: {
			src: { type: String, required: false }
		}
	};
</script>
