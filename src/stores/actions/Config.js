import {
	CONFIG_LOAD,
	CONFIG_UPDATE,
} from "../mutations/Config";

export function loadConfig (store) {
	store.commit({ type: CONFIG_LOAD });
}

export function updateConfig (store, config) {
	store.commit({
		type: CONFIG_UPDATE,
		config
	});
}
