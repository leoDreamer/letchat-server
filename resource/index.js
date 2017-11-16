/**
 * Created by leo on 2017/4/10.
 */
import Vue from "vue";
import App from "./app.vue";

Vue.config.debug = true;

new Vue({
    el: "#app",
    template: "<App/>",
    components: { App }
});
