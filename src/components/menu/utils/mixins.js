export const MenuItemMixin = {
	props: {
		value: [Object, String, Number],
		defaultDisabled: Boolean
	},

	data () {
		const data = {};
		if (this.defaultDisabled !== undefined) data.disabled = this.defaultDisabled || false;

		return data;
	},

	watch: {
		disabled: {
			handler (newValue) {
				if (newValue) {
					this.$el.setAttribute("disabled", "");
				} else {
					this.$el.removeAttribute("disabled");
				}
			}
		}
	},

	mounted () {
		if (this.disabled) {
			this.$el.setAttribute("disabled", "");
		} else {
			this.$el.removeAttribute("disabled");
		}
	}
};