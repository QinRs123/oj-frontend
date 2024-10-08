import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/plugins/axios";
import "@/access/index";
import "bytemd/dist/index.css";
// import "@/components/MdEditor.vue";

const app = createApp(App);
app.use(ArcoVue);
app.use(store);
app.use(router);
app.mount("#app");
