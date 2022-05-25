<template>
  <div class="purple d-flex justify-center align-center h-full w-full">
    <v-card
      :height="$vuetify.breakpoint.mobile ? '100%' : 660"
      :width="$vuetify.breakpoint.mobile ? '100%' : 375"
    >
      <component :is="screen" @change-screen="(sc) => (screen = sc)" />
    </v-card>
  </div>
</template>

<script>
import list from "./screens/list.vue";
import chat from "./screens/chat.vue";
export default {
  name: "HelloWorld",
  components: {
    list,
    chat,
  },

  data: () => ({
    screen: "list",
  }),
};
</script>
<style>
.h-full {
  height: 100%;
}
.w-full {
  width: 100%;
}
p {
  margin-bottom: 0 !important;
}
</style>
