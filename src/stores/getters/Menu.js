import { MenuLayoutObject } from "../../models/menu/MenuLayout";
import MenuItem from "../../models/menu/MenuItem";

export default {
	/** @return {MenuLayoutObject[]} */
	layouts: (state, getters, rootState, rootGetters) => {
		const layouts = [];
		
		/** @type {MenuLayoutObject[]} */
		const plainLayouts = rootGetters["Loader/menulayouts"].filter(layout => state.layoutIds.includes(layout.id));
		for (const layout of plainLayouts) {
			const compiledItems = [];
			for (const item of layout.items) compiledItems.push(MenuItem.compile(item));

			layouts.push(
				Object.assign(layout, {
					items: compiledItems
				})
			);
		}

		return layouts;
	}
};
