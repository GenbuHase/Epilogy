<template>
	<Epilogy-Menu :open = "isOpened && ''">
		<Epilogy-Menutitle>{{ attrs.title }}</Epilogy-Menutitle>
		<Epilogy-Menulist>
			<Epilogy-Menuitem v-for = "item of items" :key = "item">{{ item }}</Epilogy-Menuitem>
		</Epilogy-Menulist>
	</Epilogy-Menu>
</template>

<style lang = "scss" scoped>
	@import "../../styles/variables";
	
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
			display: list-item;
			list-style: none;

			color: $menu-item-color;
			font-size: 3.5vmin;
			line-height: 2;
			text-align: center;

			&:focus {
				&::before {
					content: "▶";
					
					display: inline;
					margin: 0 1em 0 -2em;

					color: $menu-selected-arrow-color;
				}
			}
		}
	}
</style>

<script>
	import { mapState } from 'vuex';

	import { toggleIsOpened } from "../../stores/actions/Menu";
	import { playSE } from "../../stores/actions/Audio";

	export default {
		props: {
			title: { type: String, required: false }
		},

		data () {
			return {
				attrs: {
					title: this.title
				},

				items: []
			}
		},

		computed: {
			...mapState({
				isOpened: state => state.Menu.isOpened,
			})
		},

		methods: {
			handleKeyUp (e) {
				switch (e.keyCode) {
					case 32:
						return toggleIsOpened(this.$store);
					case 38:
						return playSE(this.$store, require("../../assets/sounds/cursor.mp3"));
					case 40:
						return playSE(this.$store, require("../../assets/sounds/cursor.mp3"));
				}
			}
		},

		created () {
			window.addEventListener("keyup", this.handleKeyUp);
		},

		beforeDestroy () {
			window.removeEventListener("keyup", this.handleKeyUp);
		}
	};
</script>
