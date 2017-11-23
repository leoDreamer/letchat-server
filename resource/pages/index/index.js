import Vue from "vue";
import App from "./app";
import Router from "vue-router";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import axios from "assets/axios";
import { routes } from "./js/router";
import { stores } from "./js/store";
import "root/node_modules/iview/dist/styles/iview.css";

// use router vuex axios
Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueAxios, axios);

// 按需引入iview组件
import { Card, Timeline, Menu, Icon, Progress, Button } from "iview";
import { Row, Col } from "iview/src/components/grid";
Vue.component("Card", Card);
Vue.component("Timeline", Timeline);
Vue.component("MenuItem", Menu.Item);
Vue.component("Menu", Menu);
Vue.component("Row", Row);
Vue.component("Col", Col);
Vue.component("Icon", Icon);
Vue.component("Button", Button);
Vue.component("TimelineItem", Timeline.Item);
Vue.component("Progress", Progress);

// init router and vuex
const router = new Router({
    routes
});
const store = new Vuex.Store(stores);
Vue.config.debug = true;

// init vue
new Vue({
    el: "#app",
    template: "<App/>",
    components: { App },
    router,
    store
});
