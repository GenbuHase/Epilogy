export const STORY_STORYMODE_UPDATE = "STORY_STORYMODE_UPDATE";
export const STORY_CHAPTER_UPDATE = "STORY_CHAPTER_UPDATE";
export const STORY_SECTION_UPDATE = "STORY_SECTION_UPDATE";
export const STORY_DIALOGUEID_UPDATE = "STORY_DIALOGUEID_UPDATE";

export default {
	[STORY_STORYMODE_UPDATE] (state, payload) {
		if (!payload.storymode) return;
		state.storymode = payload.storymode;
	},

	[STORY_CHAPTER_UPDATE] (state, payload) {
		if (!payload.chapter) return;
		state.chapter = payload.chapter;
	},

	[STORY_SECTION_UPDATE] (state, payload) {
		if (!payload.section) return;
		state.section = payload.section;
	},

	[STORY_DIALOGUEID_UPDATE] (state, payload) {
		state.dialogueId = payload.dialogueId || 1;
	},
};
