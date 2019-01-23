import {
	STORY_STORYMODE_UPDATE,
	STORY_CHAPTER_UPDATE,
	STORY_SECTION_UPDATE,
	STORY_DIALOGUEID_UPDATE,
} from "../mutations/Story";

export function updateStorymode (store, storymode) {
	store.commit({
		type: STORY_STORYMODE_UPDATE,
		storymode
	});
}

export function updateChapter (store, chapter) {
	store.commit({
		type: STORY_CHAPTER_UPDATE, 
		chapter
	});
}

export function updateSection (store, section) {
	store.commit({
		type: STORY_SECTION_UPDATE,
		section
	});
}

export function updateDialogueId (store, dialogueId) {
	store.commit({
		type: STORY_DIALOGUEID_UPDATE,
		dialogueId
	});
}

export function updateStoryStatus (store, status) {
	const { storymode, chapter, section, dialogueId } = status;

	if (storymode) store.commit({ type: STORY_STORYMODE_UPDATE, storymode });
	if (chapter) store.commit({ type: STORY_CHAPTER_UPDATE, chapter });
	if (section) store.commit({ type: STORY_SECTION_UPDATE, section });
	store.commit({ type: STORY_DIALOGUEID_UPDATE, dialogueId });
}
