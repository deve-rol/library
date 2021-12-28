import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

const app = createApp(App);

/* register api */
import api from "./plugins/api.adapter";
api.init(app);

/* register global components */
import components from "./plugins/globalComponents";
components.init(app);

app.use(store).use(router).mount("#app");
