import Type from "../../utils/Type";
import { DialogueCompileError, Label } from "./Dialogue";

export default class FadeInDialogue {
	/** @param {FadeInCandidate} dialogueObj */
	constructor (dialogueObj) {
		return FadeInDialogue.compile(dialogueObj);
	}



	static get type () { return "fade-in" }

	/**
	 * FadeInDialogueオブジェクトに変換します
	 * 
	 * @param {FadeInCandidate} dialogueObj
	 * @return {FadeInDialogueObject}
	 */
	static compile (dialogueObj = {}) {
		if(!Type.isObject(dialogueObj) || dialogueObj.type !== this.type) throw new DialogueCompileError();

		if (typeof dialogueObj.value === "number") {
			return {
				type: this.type,
				value: {
					to: "#000000",
					duration: dialogueObj.value
				},

				label: dialogueObj.label || {}
			}
		}

		if (Type.isObject(dialogueObj.value) && dialogueObj.value.duration) {
			return {
				type: this.type,
				value: {
					to: dialogueObj.value.to || "#000000",
					duration: dialogueObj.value.duration
				},

				label: dialogueObj.label || {}
			}
		}

		throw new DialogueCompileError();
	}
}



/**
 * @typedef {Object} FadeInDialogueObject
 * @prop {"fade-in"} type
 * @prop {Object} value
 * @prop {String} value.to
 * @prop {Number} value.duration
 * @prop {Label} label
 */

/**
 * @typedef {Object} FadeInCandidate
 * @prop {"fade-in"} type
 * @prop {Number | { to: String, duration: Number }} value
 * @prop {Label} label
 */