import Type from "../../utils/Type";

export const PREFIX = "Config/";
export const CONFIG_LOAD = "LOAD";
export const CONFIG_UPDATE = "UPDATE";

export default {
	[CONFIG_LOAD] (state) {
		if (!window.localStorage.getItem("epilogy-config")) {
			window.localStorage.setItem("epilogy-config", JSON.stringify(state));
		}

		state = Object.assign(state, JSON.parse(window.localStorage.getItem("epilogy-config")));
	},

	[CONFIG_UPDATE] (state, payload) {
		if (!Type.isObject(payload.config)) return;

		const { locale } = payload.config;

		state = Object.assign(state, {
			locale: locale || state.locale
		});

		window.localStorage.setItem("epilogy-config", JSON.stringify(state));
	},
};
