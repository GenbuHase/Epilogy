<template>
	<Epilogy-Menu-Pagination @click = "handleClick">{{ value.message }}</Epilogy-Menu-Pagination>
</template>

<style lang="scss" scoped>
	@import "../../styles/variables";
	@import "../../styles/mixins";

	#{$prefix} {
		&-menu-pagination {
			@include menuitem;
			
			&:focus {
				background: $menuitem-background-color--selected;
			}

			&[disabled] {
				color: $menuitem-text-color--disabled;

				&:focus {
					background: initial;
				}
			}
		}
	}
</style>

<script>
	import { MenuItemMixin } from "./utils/mixins";

	import { updateMenuLayout } from "../../stores/actions/Menu";
	import { playSE } from "../../stores/actions/Audio";

	export default {
		mixins: [MenuItemMixin],

		methods: {
			handleClick (e) {
				const { value, disabled } = this;
				if (disabled || !value.to) return;

				updateMenuLayout(this.$store, value.to);
				playSE(this.$store, require("../../assets/sounds/cursor.mp3"));
			}
		}
	};
</script>
