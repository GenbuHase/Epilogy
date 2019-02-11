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
	}
</style>

<script>
	import { mapState, mapGetters } from "vuex";

	import { updateMenuLayout, toggleIsOpened } from "../../stores/actions/Menu";
	import { playSE } from "../../stores/actions/Audio";

	import MenuPanel from "./MenuPanel.vue";

	export default {
		components: { MenuPanel },

		computed: {
			...mapState({
				isOpened: state => state.Menu.isOpened,
			}),

			...mapGetters({
				layouts: "Menu/layouts",
			})
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

			handleKeyup (e) {
				switch (e.keyCode) {
					case 88:
						return this.toggle();
					case 38:
						return this.prev();
					case 40:
						return this.next();
				}
			}
		},

		created () {
			window.addEventListener("keyup", this.handleKeyup);

			updateMenuLayout(this.$store, ["sidebar", "config"]);
		},

		beforeDestroy () {
			window.removeEventListener("keyup", this.handleKeyup);
		}
	};
</script>
