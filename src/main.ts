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
import TagsCreatorTriggererComponent from "./components/tags-creator-triggerer-component/tags-creator-triggerer.component.vue";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
    },
  },
});

const cmradVue = createApp(App);
cmradVue.component("TagsTextAreaComponent", TagsTextAreaComponent);
cmradVue.component(
  "TagsCreatorTriggererComponent",
  TagsCreatorTriggererComponent
);
cmradVue.use(vuetify);
cmradVue.use(store).use(router).mount("#app");
