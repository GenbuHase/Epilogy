import Type from "../../utils/Type";
import { DialogueCompileError } from "./Dialogue";

export default class FadeOutDialogue {
	/** @param {FadeOutDialogueObject} dialogueObj */
	constructor (dialogueObj) {
		return FadeOutDialogue.compile(dialogueObj);
	}



	static get type () { return "fade-out" }

	/**
	 * FadeOutDialogueオブジェクトに変換します
	 * 
	 * @param {FadeOutDialogueObject} dialogueObj
	 * @return {FadeOutDialogueObject}
	 */
	static compile (dialogueObj = {}) {
		if (
			!Type.isObject(dialogueObj) || dialogueObj.type !== this.type ||
			typeof dialogueObj.value !== "number"
		) throw new DialogueCompileError();

		return {
			type: this.type,
			value: dialogueObj.value,

			forCleared: dialogueObj.forCleared || null
		}
	}
}



/**
 * @typedef {Object} FadeOutDialogueObject
 * @prop {"fade-out"} type
 * @prop {Number} value  A duration
 * 
 * @prop {Boolean} [forCleared]
 */