import Type from "../../utils/Type";
import { MenuItemCompileError } from "./MenuItem";

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
			if (paginationObj.length < 2) throw new MenuItemCompileError();

			return {
				type: this.type,
				value: {
					message: paginationObj[0],
					to: paginationObj[1]
				},

				disabled: false
			}
		}

		if (!Type.isObject(paginationObj) || paginationObj.type !== this.type) throw new MenuItemCompileError();

		return {
			type: this.type,
			value: {
				message: paginationObj.value.message || "",
				to: paginationObj.value.to || null
			},

			disabled: paginationObj.disabled || false
		}
	}
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
 * @typedef {[ String | Number, Array<String> ] | MenuPaginationObject} MenuPaginationCandidate
 */