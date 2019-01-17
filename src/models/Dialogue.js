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
					type: "message",
					value: dialogue.value || "",

					label: dialogue.label || {}
				};
				
			case "prompt":
				if (!Array.isArray(dialogue.value)) break;

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

			label: dialogue.label || {}
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
 * @typedef {Object} Dialogue
 * @prop {"message" | "prompt"} type
 * @prop {String | Array<String | Dialogue>} value
 */
