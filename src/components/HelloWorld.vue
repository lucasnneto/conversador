<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <p>
        {{ status }}
      </p>
      <v-btn @click="newChat = !newChat"> NOVO CHAT </v-btn>
    </div>
    <div v-if="!user" class="d-flex">
      <v-text-field label="User" v-model="userInput"></v-text-field>
      <v-btn @click="CREATE_USER(userInput)"> CREATE USER </v-btn>
    </div>
    <div v-else>USER: {{ user }}</div>
    <v-divider class="my-5"></v-divider>
    <div v-if="newChat" class="d-flex">
      <v-text-field label="Novo Chat" v-model="chatInput"></v-text-field>
      <v-btn
        @click="
          () => {
            CREATE_CHAT(chatInput);
            newChat = !newChat;
            chatInput = '';
          }
        "
      >
        CREATE CHAT
      </v-btn>
    </div>
    <v-divider v-if="newChat" class="my-5"></v-divider>
    <div class="d-flex">
      <div>
        <v-card v-for="ct in list" :key="ct.name" class="pa-3 mb-3">
          <p>{{ ct.name }} - {{ ct.users }}</p>
          <v-btn @click="ENTER(ct.name)">
            {{ ct.status == "INSIDE" ? "Abrir" : "Entrar" }}
          </v-btn>
        </v-card>
      </div>
      <v-divider vertical class="mx-5"></v-divider>
      <div v-if="chat.name">
        <div class="d-flex">
          <v-text-field label="mensagem" v-model="textInput"></v-text-field>
          <v-btn
            @click="
              () => {
                TEXT({ msg: textInput, name: chat.name });
                textInput = '';
              }
            "
          >
            SEND TEXT
          </v-btn>
        </div>
        <p>
          {{ chat.name }}
        </p>
        <p>
          {{ chat.users }}
        </p>
        <div>
          <v-card v-for="hist in chat.history" :key="hist.msg">
            <p>
              {{ hist.msg }}
            </p>
            <p>{{ hist.user }} - {{ hist.date }}</p>
          </v-card>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "HelloWorld",

  data: () => ({
    userInput: "",
    savedName: false,
    textInput: "",
    chatInput: "",
    newChat: false,
  }),

  computed: {
    ...mapState(["list", "chat", "status", "user"]),
  },
  methods: {
    ...mapActions(["CREATE_USER", "LIST_ALL", "ENTER", "TEXT", "CREATE_CHAT"]),
  },
  created() {
    const name = localStorage.getItem("conversadorName");
    if (name) {
      this.userInput = name;
      this.savedName = true;
    }
  },
  watch: {
    status(value) {
      if (value === "CONECTADO") {
        if (this.savedName && this.userInput) {
          this.CREATE_USER(this.userInput);
        }
        this.LIST_ALL();
      }
    },
  },
};
</script>
