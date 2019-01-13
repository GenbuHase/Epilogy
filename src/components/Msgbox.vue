<template>
	<Epilogy-Msgbox>
		<slot></slot>
	</Epilogy-Msgbox>
</template>

<script>
	export default {
		data () {
			return {

			};
		}
	};
</script>

<style lang = "scss" scoped>
	@import "../variables";

	#{$prefix} {
		&-msgbox {
			position: absolute;
			right: 0;
			bottom: 0;

			display: block;
			width: 100%;
			height: 37.5vh;
			padding: 1em;

			background: $dialog-background-color;
			border: 0.75vh ridge $dialog-border-color;
			
			color: $dialog-text-color;
		}
	}
</style>
