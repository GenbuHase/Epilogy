import Type from "../../utils/Type";
import { DialogueCompileError, Label } from "./Dialogue";

export default class FadeOutDialogue {
	/** @param {FadeOutCandidate} dialogueObj */
	constructor (dialogueObj) {
		return FadeOutDialogue.compile(dialogueObj);
	}



	static get type () { return "fade-out" }

	/**
	 * FadeOutDialogueオブジェクトに変換します
	 * 
	 * @param {FadeOutCandidate} dialogueObj
	 * @return {FadeOutDialogueObject}
	 */
	static compile (dialogueObj = {}) {
		if(!Type.isObject(dialogueObj) || dialogueObj.type !== this.type) throw new DialogueCompileError();

		if (typeof dialogueObj.value === "number") {
			return {
				type: this.type,
				value: dialogueObj.value
			}
		}

		throw new DialogueCompileError();
	}
}



/**
 * @typedef {Object} FadeOutDialogueObject
 * @prop {"fade-out"} type
 * @prop {Number} value
 */

/** @typedef {FadeOutDialogueObject} FadeOutCandidate */