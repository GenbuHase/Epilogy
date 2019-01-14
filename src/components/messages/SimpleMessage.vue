<template>
	<Epilogy-SimpleMessage></Epilogy-SimpleMessage>
</template>

<script>
	export default {
		data () {
			return {
				message: ""
			};
		},

		methods: {
			getMessage () {
				this.message = this.$parent;
			}
		}
	};
</script>
