import Type from "../../utils/Type";

import MessageDialogue, { MessageDialogueObject } from "./MessageDialogue";
import PromptDialogue, { PromptDialogueObject } from "./PromptDialogue";
import FadeInDialogue, { FadeInDialogueObject } from "./FadeInDialogue";
import FadeOutDialogue, { FadeOutDialogueObject } from "./FadeOutDialogue";

export default class Dialogue {
	constructor (dialogueObj) {
		return Dialogue.compile(dialogueObj);
	}

	/**
	 * Dialogueオブジェクトに変換します
	 * 
	 * @param {String | Number | Array<String | Number> | DialogueObject} dialogueObj
	 * @return {DialogueObject}
	 */
	static compile (dialogueObj = {}) {
		if (!Type.isObject(dialogueObj)) return new MessageDialogue(dialogueObj);

		switch (dialogueObj.type) {
			default:
				throw new DialogueCompileError();
			case MessageDialogue.type:
				return new MessageDialogue(dialogueObj);
			case PromptDialogue.type:
				return new PromptDialogue(dialogueObj);
			case FadeInDialogue.type:
				return new FadeInDialogue(dialogueObj);
			case FadeOutDialogue.type:
				return new FadeOutDialogue(dialogueObj);
		}
	}
}

export class DialogueCompileError extends TypeError {
	constructor () {
		super("The format of provided object doesn't match that of Dialogue");
	}

	get name () { return "DialogueCompileError" }
}



/**
 * @typedef {MessageDialogueObject | PromptDialogueObject | FadeInDialogueObject | FadeOutDialogueObject} DialogueObject
 */

/**
 * @typedef {Object} Label
 * @prop {Number} [chapter]
 * @prop {Number} [section]
 * @prop {Number} [dialogue]
 */

/**
 * @typedef {Object<string, Label>} LabelResults
 * @prop {Label} default
 */