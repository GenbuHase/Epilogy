<template>
	<Epilogy-MenuPagination>{{ value.message }}</Epilogy-MenuPagination>
</template>

<style lang="scss" scoped>
	@import "../../styles/variables";
	@import "../../styles/mixins";

	#{$prefix} {
		&-menupagination {
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
