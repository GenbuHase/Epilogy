import Vue from "vue";
import Vuex from "vuex";

import Story from "./Story";
import Menu from "./Menu";
import Config from "./Config";
import Audio from "./Audio";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		Story,
		Menu,
		Config,
		Audio
	}
});
