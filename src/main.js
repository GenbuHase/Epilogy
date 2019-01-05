import Vue from "vue";
import Epilogy from "./Epilogy.vue";

Vue.config.productionTip = false;

new Vue({
	el: "#app",
	render: h => h(Epilogy),
});
