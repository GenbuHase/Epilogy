<template>
	<Epilogy-Menu :open = "open && ''">
		<H1 Class = "heading">{{ title }}</H1>
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
			title: { type: String, required: true },
			open: { type: Boolean, required: false }
		},

		data () {
			return {
				items: []
			}
		},

		methods: {
			show () { this.open = true },
			hide () { this.open = false },
			toggle () { this.open = !this.open }
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
</style>