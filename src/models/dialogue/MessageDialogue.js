import Type from "../../utils/Type";
import { DialogueCompileError, Label } from "./Dialogue";

export default class MessageDialogue {
	/** @param {MessageCandidate} dialogueObj */
	constructor (dialogueObj) {
		return MessageDialogue.compile(dialogueObj);
	}



	static get type () { return "message" }

	/**
	 * MessageDialogueオブジェクトに変換します
	 * 
	 * @param {MessageCandidate} dialogueObj
	 * @param {Boolean} deeply
	 * 
	 * @return {MessageDialogueObject}
	 */
	static compile (dialogueObj = {}, deeply) {
		if (deeply) {
			if (typeof dialogueObj === "string" || typeof dialogueObj === "number") return dialogueObj;

			throw new DialogueCompileError();
		}

		if (typeof dialogueObj === "string" || typeof dialogueObj === "number") {
			return {
				type: this.type,
				value: dialogueObj,

				label: {},
				readSpeed: null
			}
		}

		if (Array.isArray(dialogueObj)) {
			return {
				type: this.type,
				value: dialogueObj.filter(col => this.compile(col, true)),

				label: {},
				readSpeed: null
			}
		}

		if (!Type.isObject(dialogueObj) || dialogueObj.type !== this.type) throw new DialogueCompileError();

		if (Array.isArray(dialogueObj.value)) {
			dialogueObj.value = dialogueObj.value.filter(col => this.compile(col, true));
		}

		return {
			type: this.type,
			value: dialogueObj.value || "",

			label: dialogueObj.label || {},
			readSpeed: dialogueObj.readSpeed || null
		}
	}
}



/**
 * @typedef {Object} MessageDialogueObject
 * @prop {"message"} type
 * @prop {String | Number | Array<String>} value
 * @prop {Label} label
 * @prop {Number | null} readSpeed
 */

/**
 * @typedef {String | Number | Array<String | Number> | MessageDialogueObject} MessageCandidate
 */