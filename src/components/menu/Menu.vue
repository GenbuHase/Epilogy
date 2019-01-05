<template>
	<Div></Div>
</template>

<script>
	export default {
		name: "Epilogy-Menu",
		
		data () {
			return {
				isOpened: false
			}
		}
	};
</script>

<style lang = "scss" scoped>
	@import "../../variables";
	
	#{$prefix} {
		&-menu {
			display: flex;

			&:not(.isOpened) { display: none }
		}
	}
</style>