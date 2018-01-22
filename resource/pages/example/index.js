import Vue from "vue";
import App from "./app";
import Vuex from "vuex";
import Router from "vue-router";
import { routes } from "../../router";
import { stores } from "../../store";
import VueAxios from "vue-axios";
import axios from "assets/axios";
import "root/node_modules/iview/dist/styles/iview.css";

// vuex
Vue.use(Vuex);
Vue.use(Router);
Vue.use(VueAxios, axios);

// 按需引入iview组件
import { Form, Message } from "iview";
Vue.component("Form", Form);
Vue.prototype.$Message = Message;

// init vuex
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
