import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@/assets/index.scss";
Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 600,
  },
});
