export const PREFIX = "Menu/";
export const MENU_LAYOUT_UPDATE = "LAYOUT_UPDATE";
export const MENU_ISOPENED_TOGGLE = "ISOPENED_TOGGLE";

export default {
	[MENU_LAYOUT_UPDATE] (state, payload) {
		if (payload.layoutIds) state.layoutIds = payload.layoutIds;
	},

	[MENU_ISOPENED_TOGGLE] (state) {
		state.isOpened = !state.isOpened;
	}
}