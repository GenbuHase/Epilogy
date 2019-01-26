import Vue from "vue";
import Vuex from "vuex";

import Story from "./Story";
import Config from "./Config";
import Audio from "./Audio";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		Story,
		Config,
		Audio
	}
});
