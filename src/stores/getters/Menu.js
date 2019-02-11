import { MenuLayoutObject } from "../../models/menu/MenuLayout";

export default {
	/** @return {MenuLayoutObject[]} */
	layouts: (state, getters, rootState, rootGetters) => {
		return rootGetters["Loader/menulayouts"].filter(layout => state.layoutIds.includes(layout.id));
	}
};
