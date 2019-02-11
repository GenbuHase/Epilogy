import Vue from "vue";
import Vuex from "vuex";

import Loader from "./Loader";
import Story from "./Story";
import Menu from "./Menu";
import Audio from "./Audio";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		Loader,
		Story,
		Menu,
		Audio
	}
});
