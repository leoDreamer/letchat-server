import Vue from "vue";
import App from "./app.vue";
import Router from "vue-router";
import iview from "iview";
import "../node_modules/iview/dist/styles/iview.css";

import PageA from "./pages/pagea";
import PageB from "./pages/pageb";

const routes = [
    { path: "/pagea", component: PageA },
    { path: "/pageb", component: PageB }
];

const router = new Router({
    routes
});

Vue.use(iview);
Vue.use(Router);

Vue.config.debug = true;

new Vue({
    el: "#app",
    template: "<App/>",
    components: { App },
    router
});
