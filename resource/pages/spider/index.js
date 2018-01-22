import Vue from "vue";
import App from "./app";
import Vuex from "vuex";
import Router from "vue-router";
import { stores } from "../../store/pages/spider";
import { routes } from "../../router/spider";
import VueAxios from "vue-axios";
import axios from "assets/axios";
import "root/node_modules/iview/dist/styles/iview.css";

// vuex
Vue.use(Vuex);
Vue.use(Router);
Vue.use(VueAxios, axios);

// 按需引入iview组件
import { Table, Timeline, Menu, Icon, Progress, Cascader,
    Button, Form, Input, Message, Dropdown, Spin } from "iview";
import { Row, Col } from "iview/src/components/grid";
Vue.component("Table", Table);
Vue.component("MenuItem", Menu.Item);
Vue.component("Menu", Menu);
Vue.component("Row", Row);
Vue.component("Col", Col);
Vue.component("Icon", Icon);
Vue.component("Button", Button);
Vue.component("TimelineItem", Timeline.Item);
Vue.component("Progress", Progress);
Vue.component("Form", Form);
Vue.component("FormItem", Form.Item);
Vue.component("Input", Input);
Vue.component("Dropdown", Dropdown);
Vue.component("DropdownMenu", Dropdown.Menu);
Vue.component("DropdownItem", Dropdown.Item);
Vue.component("Cascader", Cascader);
Vue.component("Spin", Spin);
Vue.prototype.$Message = Message;
window.$Message = Message;  // eslint-disable-line

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
