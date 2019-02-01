<template>
	<Epilogy-Menu :open = "isOpened && ''">
		<MenuPanel v-for = "(layout, index) in layouts" :key = "index" :layout = "layout" />
	</Epilogy-Menu>
</template>

<style lang="scss" scoped>
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
			z-index: 1;
			user-select: none;

			transition: opacity 0.2s ease;

			&:not([open]) { opacity: 0 }
		}

		&-menutitle {
			margin: 7.5vmin 0;

			color: $menutitle-text-color;
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

			color: $menuitem-text-color;
			font-size: 3.5vmin;
			line-height: 2;
			text-align: center;

			&:focus {
				&::before {
					color: $menuitem-background-color--selected;
				}
			}
		}
	}
</style>

<script>
	import { mapState, mapGetters } from "vuex";

	import { updateMenuState, toggleIsOpened } from "../../stores/actions/Menu";
	import { playSE } from "../../stores/actions/Audio";

	import MenuPanel from "./MenuPanel.vue";

	export default {
		components: { MenuPanel },

		computed: {
			...mapState({
				title: state => state.Menu.title,
				layouts: state => state.Menu.layouts,
				isOpened: state => state.Menu.isOpened,
			}),

			...mapGetters([
				"locales",
			])
		},

		methods: {
			toggle () {
				toggleIsOpened(this.$store);
				return playSE(this.$store, require(`../../assets/sounds/${this.isOpened ? "menu_open" : "menu_close"}.mp3`));
			},

			prev () {
				// return playSE(this.$store, require("../../assets/sounds/cursor.mp3"));
			},

			next () {
				// return playSE(this.$store, require("../../assets/sounds/cursor.mp3"));
			},

			handleKeyUp (e) {
				switch (e.keyCode) {
					case 32:
						return this.toggle();
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

				layouts: [
					{
						id: "sidebar",

						left: 0,
						right: 35,
						top: 0,
						bottom: 100,

						items: [
							{
								type: "pagination",
								value: {
									message: "シナリオ選択"
								}
							},

							{
								type: "divider"
							},

							{
								type: "pagination",
								value: {
									message: "設定"
								}
							}
						]
					}
				]
			});
		},

		beforeDestroy () {
			window.removeEventListener("keyup", this.handleKeyUp);
		}
	};
</script>
