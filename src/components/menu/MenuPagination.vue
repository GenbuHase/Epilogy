<template>
	<Epilogy-Menu-Pagination>{{ value.message }}</Epilogy-Menu-Pagination>
</template>

<style lang="scss" scoped>
	@import "../../styles/variables";
	@import "../../styles/mixins";

	#{$prefix} {
		&-menu-pagination {
			@include menuitem;
			
			&:hover {
				background: $base-accent-color;
			}
		}
	}
</style>

<script>
	import { MenuItemMixin } from "./utils/mixins";

	export default {
		mixins: [MenuItemMixin]
	};
</script>
