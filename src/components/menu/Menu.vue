<template>
	<Epilogy-Menu :open = "attrs.open && ''">
		<H1 Class = "epilogy-menutitle">{{ attrs.title }}</H1>
		<UL>
			<Menuitem v-for = "item of items" :key = "item"></Menuitem>
		</UL>
	</Epilogy-Menu>
</template>

<script>
	import Menuitem from "./Menuitem.vue";

	export default {
		components: { Menuitem },

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
				console.log(e);
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

			&:not([open]) { display: none }
		}
	}

	.#{$prefix} {
		&-menutitle {
			margin: 7.5vmin 0;

			font-size: 5vmin;
			text-align: center;
		}
	}
</style>