import Dialogue from "../../models/Dialogue";

export default {
	/** @return {Object<string, Array>} */
	stories: (state, getters, rootState) => {
		try {
			return require(`./../../assets/stories/story${ state.storymode }.${ rootState.Config.locale }.json`);
		} catch (error) {
			return require(`./../../assets/stories/story${ state.storymode }.default.json`);
		}
	},

	/** @return {Array<Dialogue>} */
	dialogues: (state, getters) => {
		const { chapter, section } = state;

		const dialogues = [];

		const pureDialogues = getters.stories[`${ chapter }${ section ? ` ${ section }` : "" }`] || [];
		for (const dialogue of pureDialogues) dialogues.push(Dialogue.compile(dialogue));
		
		return dialogues;
	},

	/** @return {Dialogue | null} */
	dialogue: (state, getters) => {
		const { dialogues } = getters;
		return (dialogues && dialogues[state.dialogueId - 1]) || null;
	}
};
