import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//Vuetify styles
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi";
//Components
import TagsTextAreaComponent from "./components/tags-textarea-component/tags-textarea.component.vue";

const vuetify = createVuetify({
  components,
  directives,
});

const cmradVue = createApp(App);
cmradVue.component("TagsTextAreaComponent", TagsTextAreaComponent);

cmradVue.use(vuetify);
cmradVue.use(store).use(router).mount("#app");
