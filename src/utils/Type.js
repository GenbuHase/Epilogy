export default class Type {
	static getClassName (variable) {
		return Object.prototype.toString.call(variable).slice(8, -1);
	}

	static isObject (variable) {
		return variable instanceof Object && !Array.isArray(variable);
	}

	/** @param {Array<String>} keys */
	static includeKeys (obj, keys) {
		return Object.keys(obj).find(key => keys.includes(key)) ? true : false;
	}
}