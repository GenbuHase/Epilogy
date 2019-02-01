import MenuItem from "./MenuItem";

export default class MenuPagination {
	constructor (paginationObj) {
		return MenuPagination.compile(paginationObj);
	}

	/**
	 * MenuPaginationオブジェクトに変換します
	 * 
	 * @param {Object} paginationObj
	 * @return {MenuPaginationObject}
	 */
	static compile (paginationObj = {}) {
		paginationObj = new MenuItem(paginationObj);

		const { type, value, disabled } = paginationObj;
		if (type !== "pagination") throw new MenuPaginationCompileError();

		return {
			type,
			value: {
				message: value.message || "",
				to: value.to || null
			},

			disabled
		};
	}
}

class MenuPaginationCompileError extends TypeError {
	constructor () {
		super("The format of provided object doesn't match that of MenuPagination");
	}

	get name () { return "MenuPaginationCompileError" }
}



/**
 * @typedef {Object} MenuPaginationObject
 * @prop {"pagination"} type
 * @prop {Object} value
 * @prop {String} value.message
 * @prop {String | null} value.to
 * @prop {Boolean} disabled
 */