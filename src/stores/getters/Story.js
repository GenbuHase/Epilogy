import { convertVariables } from "../actions/Story";
import Dialogue, { DialogueObject } from "../../models/dialogue/Dialogue";

export default {
	/** @return {Array<DialogueObject>} */
	dialogues: (state, getters, rootState, rootGetters) => {
		const { chapter, section } = state;
		const variablesRoot = {
			"heroName": getters.heroName,
			"heroName.first": state.heroName.first,
			"heroName.last": state.heroName.last,

			"heroineName": getters.heroineName,
			"heroineName.first": state.heroineName.first,
			"heroineName.last": state.heroineName.last
		}

		const dialogues = [];

		const plainDialogues = rootGetters["Loader/stories"][`${ chapter }${ section ? ` ${ section }` : "" }`] || [];
		for (const dialogue of plainDialogues) {
			const compiled = Dialogue.compile(dialogue);
			
			switch (compiled.type) {
				case "message":
					if (Array.isArray(compiled.value)) {
						for (let sentenceId = 0; sentenceId < compiled.value.length; sentenceId++) compiled.value[sentenceId] = convertVariables(variablesRoot, compiled.value[sentenceId], true);
						break;
					}

					compiled.value = convertVariables(variablesRoot, compiled.value, true);
					break;

				case "prompt":
					for (let itemId = 0; itemId < compiled.value.length; itemId++) compiled.value[itemId].message = convertVariables(variablesRoot, compiled.value[itemId].message, true);
					break;
			}

			dialogues.push(compiled);
		}
		
		return dialogues;
	},

	/** @return {DialogueObject | null} */
	dialogue: (state, getters) => {
		const { dialogues } = getters;
		return (dialogues && dialogues[state.dialogueId - 1]) || null;
	},

	heroName: state => `${state.heroName.last} ${state.heroName.first}`,
	heroineName: state => `${state.heroineName.last} ${state.heroineName.first}`
};
