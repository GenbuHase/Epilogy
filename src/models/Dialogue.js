import Type from "../utils/Type";

export default class Dialogue {
	constructor (dialogueObj) {
		return Dialogue.compile(dialogueObj);
	}

	/**
	 * Dialogueオブジェクトに変換します
	 * 
	 * @param {String | Number | Array<String | Number> | Dialogue} [dialogue = {}]
	 * @param {Boolean} deeply
	 * 
	 * @return {Dialogue}
	 */
	static compile (dialogue = {}, deeply) {
		const compiledCols = [];

		switch (dialogue.type) {
			case "message":
				if (deeply) break;

				if (Array.isArray(dialogue.value)) {
					for (const col of dialogue.value) compiledCols.push(this.compile(col, true));
					break;
				}
				
				return {
					type: dialogue.type,
					value: dialogue.value || "",

					label: dialogue.label || {},
					readSpeed: dialogue.readSpeed || null
				};
				
			case "prompt":
				if (deeply || !Array.isArray(dialogue.value)) break;

				for (let i = 0; i < dialogue.value.length; i++) {
					const item = dialogue.value[i];

					let message = "";
					let label = {};

					if (["string", "number"].includes(typeof item)) message = item;

					if (Array.isArray(item)) {
						if (!item.length) {
							dialogue.value.splice(i, 1);
							--i;

							continue;
						}

						if (["string", "number"].includes(typeof item[0])) message = item[0];
						if (Type.isObject(item[1])) label = item[1];
					}

					if (Type.isObject(item)) {
						if (item.message) message = item.message;
						if (item.label) label = item.label;
					}

					dialogue.value[i] = {
						message,
						label
					};
				}

				return dialogue;

			case "fade-in":
				if (Type.isObject(dialogue.value)) {
					if (!dialogue.value.duration) break;

					return {
						type: dialogue.type,
						value: {
							to: dialogue.value.to || "#000000",
							duration: dialogue.value.duration
						},

						label: dialogue.label || {}
					};
				}

				if (typeof dialogue.value === "number") {
					return {
						type: dialogue.type,
						value: {
							to: "#000000",
							duration: dialogue.value
						},

						label: dialogue.label || {}
					};
				}

				break;

			case "fade-out":
				if (typeof dialogue.value === "number") {
					return {
						type: dialogue.type,
						value: dialogue.value
					};
				}

				break;
		}
		
		if (["string", "number"].includes(typeof dialogue)) {
			if (deeply) return dialogue;
			
			return {
				type: "message",
				value: dialogue,

				label: {}
			};
		}

		if (Array.isArray(dialogue)) {
			for (const col of dialogue) compiledCols.push(this.compile(col, true));
		}

		if (!compiledCols.length) throw new DialogueCompileError();
		
		return {
			type: "message",
			value: compiledCols || "",

			label: dialogue.label || {},
			readSpeed: dialogue.readSpeed || null
		};
	}
}

class DialogueCompileError extends TypeError {
	constructor () {
		super("The format of provided object doesn't match that of Dialogue");
	}

	get name () { return "DialogueCompileError" }
}



/**
 * @typedef {MessageDialogue | PromptDialogue | InputDialogue | FadeInDialogue | FadeOutDialogue} Dialogue
 */

/**
 * @typedef {Object} MessageDialogue
 * @prop {"message"} type
 * @prop {String | Number | Array<String>} value
 * @prop {Label} label
 * @prop {Number} [readSpeed]
 */

/**
 * @typedef {Object} PromptDialogue
 * @prop {"prompt"} type
 * @prop {Array<{ message: String, label: Label }>} value
 */

/**
 * @typedef {Object} InputDialogue
 * @prop {"input"} type
 * @prop {{ title: String, label: LabelResults }} value
 */

/**
 * @typedef {Object} FadeInDialogue
 * @prop {"fade-in"} type
 * @prop {Number | { color: String, duration: Number }} value
 */

/**
 * @typedef {Object} FadeOutDialogue
 * @prop {"fade-out"} type
 * @prop {Number} value
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