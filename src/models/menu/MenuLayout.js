import Type from "../../utils/Type";
import { MenuItems } from "./MenuItem";

export default class MenuLayout {
	constructor (layoutObj) {
		return MenuLayout.compile(layoutObj);
	}

	/**
	 * MenuLayoutオブジェクトに変換します
	 * 
	 * @param {MenuLayoutObject} layoutObj
	 * @return {MenuLayoutObject}
	 */
	static compile (layoutObj = {}) {
		if (!Type.isObject(layoutObj)) throw new MenuLayoutCompileError();

		const { id, left, right, top, bottom, items, backTo } = layoutObj;

		if (!id) throw new MenuLayoutCompileError();
		for (const percentage of [left, right, top, bottom]) {
			if (percentage < 0 || 100 < percentage) throw new MenuLayoutCompileError();
		}
		
		return {
			id,

			left: left || 0,
			right: right || 100,
			top: top || 0,
			bottom: bottom || 100,

			items: items || [],
			backTo: backTo || null
		};
	}
}

class MenuLayoutCompileError extends TypeError {
	constructor () {
		super("The format of provided object doesn't match that of MenuLayout");
	}

	get name () { return "MenuLayoutCompileError" }
}



/**
 * @typedef {Object} MenuLayoutObject
 * @prop {String} id
 * @prop {Number} left
 * @prop {Number} right
 * @prop {Number} top
 * @prop {Number} bottom
 * @prop {MenuItems} items
 * @prop {String | null} backTo
 */