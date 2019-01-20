export default class Sanitizer {
	/**
	 * Make sure to call with setting this to Vue instance
	 * @param {Object<string, any>} obj
	 */
	static multipleUpdate (obj) {
		for (const entry of Object.entries(obj)) {
			this.$emit(`update:${ entry[0] }`, entry[1]);
		}
	}

	/**
	 * @param {String} hexColor
	 * @return {Array<Number>} RGB-color
	 */
	static hexToColor (hexColor) {
		const hexColors = hexColor.slice(1).split(/.{2}/);

		const decColors = [];
		for (const hexColor of hexColors) decColors.push(parseInt(hexColor, 16));

		return decColors;
	}
}