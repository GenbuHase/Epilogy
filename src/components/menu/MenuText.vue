<template>
	<Epilogy-Menu-Text>{{ value }}</Epilogy-Menu-Text>
</template>

<style lang="scss" scoped>

</style>

<script>
	import { MenuItemMixin } from "./utils/mixins";

	export default {
		mixins: [MenuItemMixin]
	}
</script>
