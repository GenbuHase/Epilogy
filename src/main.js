import Vue from "vue";
import Epilogy from "./Epilogy.vue";
import store from "./stores";

Vue.config.productionTip = false;

new Vue({
	el: "Epilogy",
	render: h => h(Epilogy),

	store,
});
