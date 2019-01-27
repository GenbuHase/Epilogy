import {
	PREFIX,
	CONFIG_LOAD,
	CONFIG_UPDATE,
} from "../mutations/Config";

export function loadConfig (store) {
	store.commit({ type: PREFIX + CONFIG_LOAD });
}

export function updateConfig (store, config) {
	store.commit({
		type: PREFIX + CONFIG_UPDATE,
		config
	});
}
