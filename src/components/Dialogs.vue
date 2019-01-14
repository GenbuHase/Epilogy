<template>
	<Epilogy-Dialogs>
		<Msgbox></Msgbox>
	</Epilogy-Dialogs>
</template>

<script>
	import Msgbox from "./dialogs/Msgbox.vue";

	export default {
		components: { Msgbox },

		methods: {
			formatDialogues () {
				const { dialogues } = this.$parent;

				for (const dialogue of dialogues) {
					console.log(dialogue);
				}
			}
		},

		mounted () {
			this.formatDialogues();
		}
	};
</script>
