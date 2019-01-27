export const PREFIX = "Menu/";
export const MENU_STATE_UPDATE = "STATE_UPDATE";
export const MENU_ISOPENED_TOGGLE = "ISOPENED_TOGGLE";

export default {
	[MENU_STATE_UPDATE] (state, payload) {
		if (!payload.state) return;

		const { title, items } = payload.state;

		if (title) state.title = title;
		if (items) state.items = items;
	},

	[MENU_ISOPENED_TOGGLE] (state) {
		state.isOpened = !state.isOpened;
	}
}