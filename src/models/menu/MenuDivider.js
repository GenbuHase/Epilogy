import Type from "../../utils/Type";
import { MenuItemCompileError } from "./MenuItem";

export default class MenuDivider {
	constructor (dividerObj) {
		return MenuDivider.compile(dividerObj);
	}

	

	static get type () { return "divider" }

	/**
	 * MenuDividerオブジェクトに変換します
	 * 
	 * @param {MenuDividerObject} dividerObj
	 * @return {MenuDividerObject}
	 */
	static compile (dividerObj = {}) {
		if (!Type.isObject(dividerObj) || dividerObj.type !== this.type) throw new MenuItemCompileError();

		return {
			type: this.type,
			value: null
		}
	}
}



/**
 * @typedef {Object} MenuDividerObject
 * @prop {"divider"} type
 * @prop {null} value
 */