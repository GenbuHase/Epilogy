<template>
	<Epilogy-Menu-Pagination @click = "handleClick">{{ value.message }}</Epilogy-Menu-Pagination>
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
		mixins: [MenuItemMixin],

		methods: {
			handleClick (e) {
				const { value, disabled } = this;
				if (disabled || !value.to) return;
			}
		}
	};
</script>
