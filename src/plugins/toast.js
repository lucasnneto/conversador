import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(VueToast);
export function Toast(msg) {
  Vue.$toast.error(msg);
}
