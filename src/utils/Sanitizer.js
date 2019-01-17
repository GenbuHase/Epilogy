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
}