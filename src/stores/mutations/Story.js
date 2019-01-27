export const STORY_STORYMODE_UPDATE = "STORY_STORYMODE_UPDATE";
export const STORY_CHAPTER_UPDATE = "STORY_CHAPTER_UPDATE";
export const STORY_SECTION_UPDATE = "STORY_SECTION_UPDATE";
export const STORY_DIALOGUEID_UPDATE = "STORY_DIALOGUEID_UPDATE";
export const STORY_HERONAME_UPDATE = "STORY_HERONAME_UPDATE";
export const STORY_HEROINENAME_UPDATE = "STORY_HEROINENAME_UPDATE";

export default {
	[STORY_STORYMODE_UPDATE] (state, payload) {
		if (payload.storymode) state.storymode = payload.storymode;
	},

	[STORY_CHAPTER_UPDATE] (state, payload) {
		if (payload.chapter) state.chapter = payload.chapter;
	},

	[STORY_SECTION_UPDATE] (state, payload) {
		if (payload.section) state.section = payload.section;
	},

	[STORY_DIALOGUEID_UPDATE] (state, payload) {
		state.dialogueId = payload.dialogueId || 1;
	},

	[STORY_HERONAME_UPDATE] (state, payload) {
		if (payload.first) state.heroName.first = payload.first;
		if (payload.last) state.heroName.last = payload.last
	},

	[STORY_HEROINENAME_UPDATE] (state, payload) {
		if (payload.first) state.heroineName.first = payload.first;
		if (payload.last) state.heroineName.last = payload.last
	}
};
