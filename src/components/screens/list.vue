<template>
  <div class="d-flex flex-column h-full">
    <div style="height: 60px">
      <div v-if="!user" class="d-flex mx-3 mt-3">
        <v-text-field
          solo
          label="Nome de usuário"
          class="rounded-0"
          v-model="userInput"
          hide-details
        ></v-text-field>
        <v-btn
          height="48"
          class="rounded-0"
          color="purple"
          @click="CREATE_USER(userInput)"
        >
          Salvar
        </v-btn>
      </div>
      <div class="mx-3 mt-3 d-flex justify-space-between" v-else>
        <h2>{{ user }}</h2>
        <v-btn icon outlined>
          <v-icon>mdi-chat-plus</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider style="border-color: black"></v-divider>
    <div class="h-full d-flex flex-column">
      <div
        class="mx-3 mt-3 overflow-y-auto"
        style="height: 45%; max-height: 45%"
      >
        <h3 class="mb-4">Meus Chats</h3>
        <v-card
          v-for="ct in myChats"
          @click="enterChat(ct.name)"
          :key="ct.name"
          class="mb-4 pa-4 d-flex justify-space-between"
        >
          <p>
            {{ ct.name }}
          </p>
          <div class="d-flex align-center">
            <div
              style="height: 12px; width: 12px"
              class="green rounded-circle mr-2"
            />
            <p>{{ ct.users }}</p>
          </div>
        </v-card>
      </div>
      <div class="overflow-hidden d-flex flex-column">
        <v-divider style="border-color: black"></v-divider>
        <div class="ma-3 d-flex flex-column overflow-y-auto">
          <h3 class="mb-4">Chats do Servidor</h3>
          <v-card
            @click="enterChat(ct.name)"
            v-for="ct in otherChats"
            :key="ct.name"
            class="mb-4 pa-4 d-flex justify-space-between"
          >
            <p>
              {{ ct.name }}
            </p>
            <div class="d-flex align-center">
              <div
                style="height: 12px; width: 12px"
                class="green rounded-circle mr-2"
              />
              <p>{{ ct.users }}</p>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    userInput: "",
    savedName: false,
  }),
  created() {
    const name = localStorage.getItem("conversadorName");
    if (name) {
      this.userInput = name;
      this.savedName = true;
    }
  },
  methods: {
    ...mapActions(["CREATE_USER", "LIST_ALL", "ENTER"]),
    enterChat(name) {
      this.ENTER(name);
      this.$emit("change-screen", "chat");
    },
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
  computed: {
    ...mapState(["list", "chat", "status", "user"]),
    myChats() {
      return this.list.filter((chat) => chat.status === "INSIDE");
    },
    otherChats() {
      return this.list.filter((chat) => chat.status === "OUTSIDE");
    },
  },
};
</script>
