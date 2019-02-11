<template>
	<Epilogy-Menu-Panel :style = "panelStyle">
		<Epilogy-Menu-BackButton v-show = "layout.backTo" />

		<Epilogy-Menu-Menuitems>
			<component
				v-for = "(item, index) in layout.items"
				:key = "Date.now() + '' + index"
				:is = "detectComponent(item)"
				v-bind = "item"
				:defaultDisabled = "item.disabled"
				:tabIndex = "index + 1" />
		</Epilogy-Menu-Menuitems>
	</Epilogy-Menu-Panel>
</template>

<style lang="scss" scoped>
	@import "../../styles/variables";
	@import "../../styles/mixins";

	#{$prefix} {
		&-menu-panel {
			@include root-component;

			position: absolute;
			left: 0;
			top: 0;

			max-width: 100%;
			max-height: 100%;

			overflow-y: auto;
		}

		&-menu-backbutton {
			@include root-component;

			position: absolute;
			right: -0.75vmin;
			top: -0.75vmin;

			display: flex;
			justify-content: center;
			align-items: center;
			
			width: 5vmin;
			height: 5vmin;
			z-index: 127;

			&::before {
				content: "×";

				display: inline;
				color: $menuitem-text-color;
			}
		}

		&-menu-menuitems {
			display: block;
			flex: 1;

			overflow: auto;
		}
	}
</style>

<script>
	import MenuText from "./MenuText.vue";
	import MenuPagination from "./MenuPagination.vue";
	import MenuDivider from "./MenuDivider.vue";

	export default {
		props: {
			layout: { type: Object, required: true }
		},

		computed: {
			panelStyle () {
				const { left, right, top, bottom } = this.layout;

				return {
					left: `${left}%`,
					top: `${top}%`,
					width: `${right - left}%`,
					height: `${bottom - top}%`
				};
			}
		},

		methods: {
			detectComponent (itemObj) {
				const { type, value } = itemObj;

				switch (type) {
					case "text":
						return MenuText;
					case "pagination":
						return MenuPagination;
					case "divider":
						return MenuDivider;
				}
			}
		},
	};
</script>
