import { DialogueObject } from "../../models/dialogue/Dialogue";
import { MenuLayoutObject } from "../../models/menu/MenuLayout";

export default {
	/** @return {Object<string, DialogueObject[]>} */
	stories: (state, getters, rootState) => {
		try {
			return require(`../../assets/stories/story${ rootState.Story.storymode }.json`);
		} catch (error) {
			return [];
		}
	},

	/** @return {MenuLayoutObject[]} */
	menulayouts: () => {
		try {
			return require("../../assets/layouts.json");
		} catch (error) {
			return [];
		}
	}
};
