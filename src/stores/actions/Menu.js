import {
	PREFIX,
	MENU_LAYOUT_UPDATE,
	MENU_ISOPENED_TOGGLE,
} from "../mutations/Menu";

export function updateMenuLayout (store, layoutIds) {
	store.commit({
		type: PREFIX + MENU_LAYOUT_UPDATE,
		layoutIds
	});
}

export function toggleIsOpened (store) {
	store.commit({ type: PREFIX + MENU_ISOPENED_TOGGLE });
}
