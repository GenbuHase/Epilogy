import Type from "../../utils/Type";
import { DialogueCompileError, Label } from "./Dialogue";

export default class PromptDialogue {
	/** @param {PromptCandidate} dialogueObj */
	constructor (dialogueObj) {
		return PromptDialogue.compile(dialogueObj);
	}

	

	static get type () { return "prompt" }

	/**
	 * PromptDialogueオブジェクトに変換します
	 * 
	 * @param {PromptCandidate} dialogueObj
	 * @return {PromptDialogueObject}
	 */
	static compile (dialogueObj = {}) {
		if (!Type.isObject(dialogueObj) || dialogueObj.type !== this.type) throw new DialogueCompileError();
		if (!Array.isArray(dialogueObj.value)) throw new DialogueCompileError();

		return dialogueObj.value.filter(item => {
			if (typeof item === "string" || typeof item === "number") {
				return {
					message: item,
					label: {}
				}
			}

			if (Array.isArray(item)) {
				if (!item.length) return;

				if (
					!["string", "number"].includes(typeof item[0]) ||
					!Type.isObject(item[1])
				) throw new DialogueCompileError();
				
				return {
					message: item[0],
					label: item[1]
				}
			}

			if (Type.isObject(item)) {
				if (
					!["string", "number"].includes(typeof item.message) ||
					!Type.isObject(item.label)
				) throw new DialogueCompileError();
				
				return {
					message: item.message,
					label: item.label
				}
			}

			throw new DialogueCompileError();
		});
	}
}



/**
 * @typedef {Object} PromptDialogueObject
 * @prop {"prompt"} type
 * @prop {Array<{ message: String | Number, label: Label }>} value
 */

/**
 * @typedef {Object} PromptCandidate
 * @prop {"prompt"} type
 * @prop {Array<{ message: String | Number, label: Label } | String | Number | [ String | Number, Label ]>} value
 */