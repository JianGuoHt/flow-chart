import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "normalize.css/normalize.css";
import "@/assets/styles/index.scss";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
