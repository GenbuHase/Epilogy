import Type from "../../utils/Type";

import MenuText, { MenuTextObject } from "./MenuText"
import MenuPagination, { MenuPaginationObject } from "./MenuPagination";
import MenuDivider, { MenuDividerObject } from "./MenuDivider";

export default class MenuItem {
	constructor (itemObj) {
		return MenuItem.compile(itemObj);
	}

	/**
	 * MenuItemオブジェクトに変換します
	 * 
	 * @param {String | Number | [String | Number, Array<String>] | MenuItemObject} itemObj
	 * @return {MenuItemObject}
	 */
	static compile (itemObj = {}) {
		if (!Type.isObject(itemObj)) {
			if (typeof itemObj === "string" || typeof itemObj === "number") return new MenuText(itemObj);
			if (Array.isArray(itemObj)) return new MenuPagination(itemObj);
		}

		switch (itemObj.type) {
			default:
				throw new MenuItemCompileError();
			case MenuText.type:
				return new MenuText(itemObj);
			case MenuPagination.type:
				return new MenuPagination(itemObj);
			case MenuDivider.type:
				return new MenuDivider(itemObj);
		}
	}
}

export class MenuItemCompileError extends TypeError {
	constructor () {
		super("The format of provided object doesn't match that of MenuItem");
	}

	get name () { return "MenuItemCompileError" }
}



/**
 * @typedef {MenuTextObject | MenuPaginationObject | MenuDividerObject} MenuItemObject
 */

/**
 * @typedef {Array<MenuItemObject>} MenuItems
 */