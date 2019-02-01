import MenuItem from "./MenuItem";

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
		dividerObj = new MenuItem(dividerObj);

		const { type, disabled } = dividerObj;
		if (type !== "divider") throw new MenuDividerCompileError();

		return {
			type,
			value: null,

			disabled
		};
	}
}

class MenuDividerCompileError extends TypeError {
	constructor () {
		super("The format of provided object doesn't match that of MenuDivider");
	}

	get name () { return "MenuDividerCompileError" }
}



/**
 * @typedef {Object} MenuDividerObject
 * @prop {"divider"} type
 * @prop {null} value
 * @prop {Boolean} disabled
 */