/**
 * Created by dutao on 2017/4/10.
 */
const Vue = require("vue");
const App = require("./app.vue");

Vue.config.debug = true;

new Vue({
    el: "#app",
    render: (createElement) => createElement(App)
});
