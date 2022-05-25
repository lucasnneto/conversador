<template>
  <div class="d-flex flex-column h-full">
    <div style="height: 60px">
      <div class="mx-3 mt-3 d-flex justify-space-between">
        <div class="d-flex">
          <v-btn @click="backList" icon outlined class="mr-2">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div>
            <h3>{{ chat.name }}</h3>
            <div class="d-flex align-center">
              <div
                style="height: 8px; width: 8px"
                class="green rounded-circle mr-1"
              />
              <p class="text-caption">{{ qtdUsers }}</p>
            </div>
          </div>
        </div>
        <v-btn icon outlined>
          <v-icon>mdi-account-group</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider style="border-color: black"></v-divider>
    <div
      class="d-flex overflow-hidden flex-column justify-space-between h-full ml-3"
    >
      <div id="chat" class="overflow-y-auto d-flex flex-column pr-3">
        <!-- style="height: 530px" -->
        <v-card
          width="70%"
          v-for="hist in history"
          :key="hist.msg + hist.date"
          :class="{
            'rounded-br-0': hist.isMy,
            'rounded-bl-0': !hist.isMy,
          }"
          class="mb-4 pa-3"
          :style="hist.isMy ? 'align-self: end;' : ''"
        >
          <p>
            {{ hist.msg }}
          </p>
          <div
            class="d-flex"
            :class="{
              'justify-space-between': !hist.isMy,
              'justify-end': hist.isMy,
            }"
          >
            <p class="text-caption" v-if="!hist.isMy">
              {{ hist.user }}
            </p>
            <p class="text-caption">
              {{ hist.moment }}
            </p>
          </div>
        </v-card>
      </div>
      <div class="d-flex mt-3">
        <v-text-field
          solo
          label="Nome de usuário"
          class="rounded-0"
          v-model="textInput"
          hide-details
          v-on:keyup.enter="
            () => {
              TEXT({ msg: textInput, name: chat.name });
              textInput = '';
            }
          "
        ></v-text-field>
        <v-btn
          height="48"
          icon
          text
          @click="
            () => {
              TEXT({ msg: textInput, name: chat.name });
              textInput = '';
            }
          "
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import "moment/locale/pt-br";
var notify = function (title = "Nova mensagem", msg) {
  if (!window.Notification) {
    console.log("Este browser não suporta Web Notifications!");
    return;
  }

  if (Notification.permission === "default") {
    Notification.requestPermission(function () {
      console.log(
        "Usuário não falou se quer ou não notificações. Logo, o requestPermission pede a permissão pra ele."
      );
    });
  } else if (Notification.permission === "granted") {
    // var notification =
    new Notification(title, {
      body: msg,
    });
    // notification.onshow = function() {
    //  console.log('onshow: evento quando a notificação é exibida')
    // },
    // notification.onclick = function() {
    //  console.log('onclick: evento quando a notificação é clicada')
    // },
    // notification.onclose = function() {
    //  console.log('onclose: evento quando a notificação é fechada')
    // },
    // notification.onerror = function() {
    //  console.log('onerror: evento quando a notificação não pode ser exibida. É disparado quando a permissão é defualt ou denied')
    // }
  } else if (Notification.permission === "denied") {
    console.log("Usuário não deu permissão");
  }
};
export default {
  data: () => ({
    textInput: "",
  }),
  mounted() {
    this.scrollY();
  },
  methods: {
    ...mapActions(["CREATE_USER", "LIST_ALL", "ENTER", "TEXT"]),
    backList() {
      this.$emit("change-screen", "list");
    },
    scrollY() {
      const element = document.getElementById("chat");
      if (element) {
        setTimeout(() => {
          element.scrollTo({
            top: element.scrollHeight,
            behavior: "smooth",
          });
        }, 0);
      }
    },
  },
  computed: {
    ...mapState(["chat", "status", "user"]),
    qtdUsers() {
      return this.chat?.users?.length || "?";
    },
    history() {
      return this.chat?.history?.map((his) => ({
        ...his,
        isMy: his.user === this.user,
        moment: moment(his.date).fromNow(),
      }));
    },
  },
  watch: {
    history: {
      deep: true,
      handler: function (value, old) {
        if (old) {
          if (value.length > old.length) {
            if (!value.at(-1).isMy) {
              const notFocused = !document.hasFocus();
              if (notFocused) {
                notify(
                  "Nova mensagem de " + value.at(-1).user,
                  value.at(-1).msg
                );
              }
              var audio = new Audio("not.wav");
              audio.volume = 0.06;
              audio.addEventListener("canplaythrough", function () {
                audio.play();
              });
            }
          }
        }
        this.scrollY();
      },
    },
  },
};
</script>
