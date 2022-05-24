import Vue from "vue";
import Vuex from "vuex";
import { ws } from "@/services/ws";
import { Toast } from "@/plugins/toast";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    chat: {},
    user: "",
    status: "",
  },
  getters: {
    connected: (state) => state.status === "CONECTADO",
  },
  mutations: {
    CHANGE(state, payload) {
      Object.assign(state, payload);
    },
  },
  actions: {
    CHANGE({ commit }, payload) {
      commit("CHANGE", payload);
    },
    RECEIVED({ commit }, payload) {
      if (payload.msg || typeof payload == "string") {
        console.log(payload.msg || payload);
        Toast(payload.msg || payload);
      } else {
        switch (payload.type) {
          case "CHAT":
            commit("CHANGE", {
              chat: {
                name: payload.name,
                history: payload.history,
                users: payload.users,
              },
            });
            break;
          case "LIST_ALL":
            commit("CHANGE", { list: payload.chats });
            break;
          case "USER_CREATED":
            localStorage.setItem("conversadorName", payload.name);
            commit("CHANGE", { user: payload.name });
            break;
        }
      }
    },
    SEND(_, payload) {
      ws.send(JSON.stringify(payload));
    },
    CREATE_USER(_, payload) {
      ws.send(
        JSON.stringify({
          type: "CREATE_USER",
          name: payload,
        })
      );
    },
    ENTER(_, payload) {
      ws.send(
        JSON.stringify({
          type: "ENTER",
          name: payload,
        })
      );
    },
    LIST_ALL(_, payload) {
      ws.send(
        JSON.stringify({
          type: "LIST_ALL",
          name: payload,
        })
      );
    },
    TEXT(_, payload) {
      ws.send(
        JSON.stringify({
          type: "TEXT",
          ...payload,
        })
      );
    },
    CREATE_CHAT(_, payload) {
      ws.send(
        JSON.stringify({
          type: "CREATE",
          name: payload,
        })
      );
    },
  },
  modules: {},
});
