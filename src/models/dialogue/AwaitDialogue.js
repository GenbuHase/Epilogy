import Type from "../../utils/Type";
import { DialogueCompileError } from "./Dialogue";

export default class AwaitDialogue {
	/** @param {AwaitDialogueObject} dialogueObj */
	constructor (dialogueObj) {
		return AwaitDialogue.compile(dialogueObj);
	}



	static get type () { return "await" }

	/**
	 * AwaitDialogueオブジェクトに変換します
	 * 
	 * @param {AwaitDialogueObject} dialogueObj
	 * @return {AwaitDialogueObject}
	 */
	static compile (dialogueObj = {}) {
		if (
			!Type.isObject(dialogueObj) || dialogueObj.type !== this.type || 
			typeof dialogueObj.value !== "number"
		) throw new DialogueCompileError();

		return {
			type: this.type,
			value: dialogueObj.value
		}
	}
}



/**
 * @typedef {Object} AwaitDialogueObject
 * @prop {"await"} type
 * @prop {Number} value  A duration
 */