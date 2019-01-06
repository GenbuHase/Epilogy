<template>
	<Epilogy-Menu :open = "attrs.open && ''">
		<Epilogy-Menutitle>{{ attrs.title }}</Epilogy-Menutitle>
		<Epilogy-Menulist>
			<Epilogy-Menuitem v-for = "item of items" :key = "item">{{ item }}</Epilogy-Menuitem>
		</Epilogy-Menulist>
	</Epilogy-Menu>
</template>

<script>
	export default {
		props: {
			title: { type: String, required: false },
			open: { type: Boolean, required: false }
		},

		data () {
			return {
				attrs: {
					title: this.title,
					open: this.open
				},

				items: []
			}
		},

		methods: {
			show () { this.attrs.open = true },
			hide () { this.attrs.open = false },
			toggle () { this.attrs.open = !this.attrs.open }
		},

		created () {
			window.addEventListener("keydown", e => {
				if (e.keyCode === 88) this.toggle();
			});
		}
	};
</script>

<style lang = "scss" scoped>
	@import "../../variables";
	
	#{$prefix} {
		&-menu {
			position: absolute;

			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;

			user-select: none;

			transition: opacity 0.25s ease;

			&:not([open]) { opacity: 0 }
		}

		&-menutitle {
			margin: 7.5vh 0;

			font-size: 5vh;
			font-weight: bold;
			text-align: center;
		}

		&-menulist {
			display: block;
			flex: 1;
			padding: 0 15vh;

			overflow: auto;
		}

		&-menuitem {
			display: list-item;

			font-size: 3.5vh;
			text-align: center;

			list-style: none;

			&:hover { list-style-image: url("../../assets/menuitem_arrow.svg") }
		}
	}
</style>