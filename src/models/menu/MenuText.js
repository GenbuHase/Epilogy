import Type from "../../utils/Type";
import { MenuItemCompileError } from "./MenuItem";

export default class MenuText {
	constructor (textObj) {
		return MenuText.compile(textObj);
	}

	

	static get type () { return "text" }

	/**
	 * MenuTextオブジェクトに変換します
	 * 
	 * @param {MenuTextCandidate} textObj
	 * @return {MenuTextObject}
	 */
	static compile (textObj = {}) {
		if (typeof textObj === "string" || typeof textObj === "number") {
			return {
				type: this.type,
				value: textObj
			}
		}

		if (!Type.isObject(textObj) || textObj.type !== this.type) throw new MenuItemCompileError();

		return {
			type: this.type,
			value: textObj.value
		}
	}
}



/**
 * @typedef {Object} MenuTextObject
 * @prop {"text"} type
 * @prop {String | Number} value
 */

/**
 * @typedef {String | Number | MenuTextObject} MenuTextCandidate
 */