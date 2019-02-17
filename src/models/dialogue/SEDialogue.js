import Type from "../../utils/Type";
import { DialogueCompileError } from "./Dialogue";

export default class SEDialogue {
	/** @param {SEDialogueObject} dialogueObj */
	constructor (dialogueObj) {
		return SEDialogue.compile(dialogueObj);
	}



	static get type () { return "se" }

	/**
	 * SEDialogueオブジェクトに変換します
	 * 
	 * @param {SEDialogueObject} dialogueObj
	 * @return {SEDialogueObject}
	 */
	static compile (dialogueObj = {}) {
		if (
			!Type.isObject(dialogueObj) || dialogueObj.type !== this.type || 
			typeof dialogueObj.value !== "string"
		) throw new DialogueCompileError();

		return {
			type: this.type,
			value: dialogueObj.value,

			forCleared: dialogueObj.forCleared || null
		}
	}
}



/**
 * @typedef {Object} SEDialogueObject
 * @prop {"se"} type
 * @prop {String} value  A path of sound file
 * 
 * @prop {Boolean} [forCleared]
 */