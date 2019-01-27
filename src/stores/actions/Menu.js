import {
	PREFIX,
	MENU_STATE_UPDATE,
	MENU_ISOPENED_TOGGLE,
} from "../mutations/Menu";

export function updateMenuState (store, state) {
	store.commit({
		type: PREFIX + MENU_STATE_UPDATE,
		state
	});
}

export function toggleIsOpened (store) {
	store.commit({ type: PREFIX + MENU_ISOPENED_TOGGLE });
}
