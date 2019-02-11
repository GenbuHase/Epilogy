<template>
	<Epilogy-Menu-Text>{{ value }}</Epilogy-Menu-Text>
</template>

<style lang="scss" scoped>
	@import "../../styles/variables";
	@import "../../styles/mixins";

	#{$prefix} {
		&-menu-text {
			@include menuitem;

			height: 7.5vmin;
		}
	}
</style>

<script>
	import { MenuItemMixin } from "./utils/mixins";

	export default {
		mixins: [MenuItemMixin]
	}
</script>
