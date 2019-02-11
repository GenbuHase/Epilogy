import MenuItem from "./MenuItem";

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

		textObj = new MenuItem(textObj);

		const { type, value } = textObj;
		if (type !== this.type) throw new MenuTextCompileError();

		return {
			type,
			value
		}
	}
}

class MenuTextCompileError extends TypeError {
	constructor () {
		super("The format of provided object doesn't match that of MenuText");
	}

	get name () { return "MenuTextCompileError" }
}



/**
 * @typedef {Object} MenuTextObject
 * @prop {"text"} type
 * @prop {String | Number} value
 */

/**
 * @typedef {String | Number | MenuTextObject} MenuTextCandidate
 */