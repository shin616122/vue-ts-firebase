import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VuesticPlugin } from "vuestic-ui";

createApp(App).use(VuesticPlugin).use(store).use(router).mount("#app");
