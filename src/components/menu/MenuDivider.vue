<template>
	<Epilogy-Menu-Divider />
</template>

<style lang="scss" scoped>
	@import "../../styles/variables";
	@import "../../styles/mixins";

	#{$prefix} {
		&-menu-divider {
			@include menuitem;
			
			display: block;
			height: auto;
			margin: 0.5vmin 0;

			border-bottom: thin solid white;
		}
	}
</style>

<script>
	import { MenuItemMixin } from "./utils/mixins";

	export default {
		mixins: [MenuItemMixin]
	}
</script>
