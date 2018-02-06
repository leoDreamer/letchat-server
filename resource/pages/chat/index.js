import Vue from "vue";
import App from "./app";
import Vuex from "vuex";
import { stores } from "../../store/pages/chat";
import VueAxios from "vue-axios";
import axios from "assets/axios";
import "root/node_modules/iview/dist/styles/iview.css";

// vuex
Vue.use(Vuex);
Vue.use(VueAxios, axios);

// 按需引入iview组件
import { Button, Form, Input, Icon, Message, Avatar, Badge } from "iview";
Vue.component("Form", Form);
Vue.component("FormItem", Form.Item);
Vue.component("Input", Input);
Vue.component("Button", Button);
Vue.component("Icon", Icon);
Vue.component("Avatar", Avatar);
Vue.component("Badge", Badge);
Vue.prototype.$Message = Message;
window.$Message = Message;

// init vuex
const store = new Vuex.Store(stores);
Vue.config.debug = true;

// init vue
new Vue({
    el: "#app",
    template: "<App/>",
    components: { App },
    store
});
