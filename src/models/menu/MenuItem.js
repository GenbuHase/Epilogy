import Type from "../../utils/Type";

export default class MenuItem {
	constructor (itemObj) {
		return MenuItem.compile(itemObj);
	}

	/**
	 * MenuItemオブジェクトに変換します
	 * 
	 * @param {Object} itemObj
	 * @return {MenuItemObject}
	 */
	static compile (itemObj = {}) {
		if (!Type.isObject(itemObj)) throw new MenuItemCompileError();

		const { type, value, disabled } = itemObj;
		if (!type) throw new MenuItemCompileError();

		return {
			type,
			value: value || null,

			disabled: disabled || false
		};
	}
}

class MenuItemCompileError extends TypeError {
	constructor () {
		super("The format of provided object doesn't match that of MenuItem");
	}

	get name () { return "MenuItemCompileError" }
}



/**
 * @typedef {Object} MenuItemObject
 * @prop {String} type
 * @prop {Object | null} value
 * @prop {Boolean} disabled
 */

/**
 * @typedef {Array<import("./MenuPagination").MenuPaginationObject>} MenuItems
 */