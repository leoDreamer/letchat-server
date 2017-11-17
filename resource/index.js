import Vue from "vue";
import App from "./app";
import Router from "vue-router";
import iview from "iview";
import Vuex from "vuex";
import { routes } from "./router";
import { stores } from "./store";
import "../node_modules/iview/dist/styles/iview.css";

Vue.use(iview);
Vue.use(Router);
Vue.use(Vuex);

const router = new Router({
    routes
});

const store = new Vuex.Store(stores);
Vue.config.debug = true;

new Vue({
    el: "#app",
    template: "<App/>",
    components: { App },
    router,
    store
});
