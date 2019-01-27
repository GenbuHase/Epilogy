import {
	PREFIX,
	MENU_ISOPENED_TOGGLE,
} from "../mutations/Menu";

export function toggleIsOpened (store) {
	store.commit({ type: PREFIX + MENU_ISOPENED_TOGGLE });
}
