export const PREFIX = "Menu/";
export const MENU_ISOPENED_TOGGLE = "ISOPENED_TOGGLE";

export default {
	[MENU_ISOPENED_TOGGLE] (state) {
		state.isOpened = !state.isOpened;
	}
}