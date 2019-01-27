<template>
	<Epilogy-Menu :open = "isOpened && ''">
		<Epilogy-Menutitle>{{ title }}</Epilogy-Menutitle>
		<Epilogy-Menulist ref = "items">
			<Epilogy-Menuitem v-for = "(item, index) in items" :key = "index" :tabIndex = "index + 1">{{ item }}</Epilogy-Menuitem>
		</Epilogy-Menulist>
	</Epilogy-Menu>
</template>

<style lang = "scss" scoped>
	@import "../../styles/variables";
	@import "../../styles/mixins";
	
	#{$prefix} {
		&-menu {
			position: absolute;
			left: 0;
			top: 0;

			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;

			background: $menu-background-color;
			border: 0.75vmin ridge $menu-border-color;
			z-index: 1;
			user-select: none;

			transition: opacity 0.2s ease;

			&:not([open]) { opacity: 0 }
		}

		&-menutitle {
			margin: 7.5vmin 0;

			color: $menu-title-color;
			font-size: 5vmin;
			font-weight: bold;
			text-align: center;
		}

		&-menulist {
			display: block;
			flex: 1;
			padding: 0 15vmin;

			overflow: auto;
		}

		&-menuitem {
			@include selectable;

			display: list-item;
			list-style: none;

			color: $menu-item-color;
			font-size: 3.5vmin;
			line-height: 2;
			text-align: center;

			&:focus {
				&::before {
					color: $menu-selected-arrow-color;
				}
			}
		}
	}
</style>

<script>
	import { mapState, mapGetters } from "vuex";

	import { updateMenuState, toggleIsOpened } from "../../stores/actions/Menu";
	import { playSE } from "../../stores/actions/Audio";

	export default {
		computed: {
			...mapState({
				title: state => state.Menu.title,
				items: state => state.Menu.items,
				isOpened: state => state.Menu.isOpened,
			}),

			...mapGetters([
				"locales",
			])
		},

		methods: {
			prev () {
				// return playSE(this.$store, require("../../assets/sounds/cursor.mp3"));
			},

			next () {
				// return playSE(this.$store, require("../../assets/sounds/cursor.mp3"));
			},

			handleKeyUp (e) {
				switch (e.keyCode) {
					case 32:
						return toggleIsOpened(this.$store);
					case 38:
						return this.prev();
					case 40:
						return this.next();
				}
			}
		},

		created () {
			window.addEventListener("keyup", this.handleKeyUp);

			updateMenuState(this.$store, {
				title: this.locales["menu_top-menu_title"],
				items: this.locales["menu_top-menu_items"]
			});
		},

		beforeDestroy () {
			window.removeEventListener("keyup", this.handleKeyUp);
		}
	};
</script>
