import MenuItem from "./MenuItem";

export default class MenuPagination {
	constructor (paginationObj) {
		return MenuPagination.compile(paginationObj);
	}

	

	static get type () { return "pagination" }

	/**
	 * MenuPaginationオブジェクトに変換します
	 * 
	 * @param {MenuPaginationCandidate} paginationObj
	 * @return {MenuPaginationObject}
	 */
	static compile (paginationObj = {}) {
		if (Array.isArray(paginationObj)) {
			if (paginationObj.length < 2) throw new MenuPaginationCompileError();

			return {
				type: this.type,
				value: {
					message: paginationObj[0],
					to: paginationObj[1]
				}
			}
		}

		paginationObj = new MenuItem(paginationObj);

		const { type, value, disabled } = paginationObj;
		if (type !== this.type) throw new MenuPaginationCompileError();

		return {
			type,
			value: {
				message: value.message || "",
				to: value.to || null
			},

			disabled
		}
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

/**
 * @typedef {[ String | Number, String ] | MenuPaginationObject} MenuPaginationCandidate
 */