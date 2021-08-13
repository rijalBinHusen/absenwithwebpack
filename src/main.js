import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "w3-css/3/w3.css"

createApp(App).use(store).mount("#app");
