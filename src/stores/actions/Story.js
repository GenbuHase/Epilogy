import {
	STORY_STORYMODE_UPDATE,
	STORY_CHAPTER_UPDATE,
	STORY_SECTION_UPDATE,
	STORY_DIALOGUEID_UPDATE,
	STORY_HERONAME_UPDATE,
	STORY_HEROINENAME_UPDATE,
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

export function updateHeroName (store, name) {
	const { first, last } = name;
	store.commit({ type: STORY_HERONAME_UPDATE, first, last });
}

export function updateHeroineName (store, name) {
	const { first, last } = name;
	store.commit({ type: STORY_HEROINENAME_UPDATE, first, last });
}



/**
 * It returns variable expression(s), or null if it couldn't find
 * 
 * @param {String | Array<String>} sentence
 * @param {Object<string, any>} variableRoot
 * @param {Boolean} useKeyMapping
 * 
 * @return {{ expression: String, value: any } | Array<{ expression: String, value: any } | null>}
 */
export function findVariables (sentence, variableRoot, useKeyMapping) {
	const variableMatcher = /\{\{\s*([^\s}]+)\s*\}\}/g;
	const variables = [];

	let result = null;
	while ((result = variableMatcher.exec(sentence)) !== null) {
		const keys = result[1].split(".").map(key => `["${key}"]`).join("");
		variables.push({ expression: result[0], value: new Function("variableRoot", `return variableRoot${useKeyMapping ? `["${result[1]}"]` : keys}`)(variableRoot) });
	}

	if (variables.length === 0) return null;
	if (variables.length === 1) return variables[0];
	return variables;
}

/**
 * It returns the sentence filled with provided variables
 * 
 * @param {Object<string, any>} root
 * @param {String} sentence
 * @param {Boolean} useKeyMapping
 */
export function convertVariables (root, sentence, useKeyMapping) {
	const variables = findVariables(sentence, root, useKeyMapping);

	if (variables) {
		if (Array.isArray(variables)) {
			for (const variable of variables) sentence = sentence.replace(variable.expression, variable.value);
			return sentence;
		}

		return sentence.replace(variables.expression, variables.value);
	}

	return sentence;
}
