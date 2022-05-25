<template>
  <div class="card purple d-flex justify-center align-center h-full w-full">
    <v-card
      :height="$vuetify.breakpoint.mobile ? '100%' : 660"
      :width="$vuetify.breakpoint.mobile ? '100%' : 375"
      class="max-card"
    >
      <component :is="screen" @change-screen="(sc) => (screen = sc)" />
    </v-card>
  </div>
</template>

<script>
import list from "./screens/list.vue";
import chat from "./screens/chat.vue";
function appHeight() {
  const doc = document.documentElement;
  doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
}
export default {
  name: "HelloWorld",
  components: {
    list,
    chat,
  },
  created() {
    window.addEventListener("resize", appHeight);
    appHeight();
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
.card {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
.max-card {
  max-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  max-height: calc(var(--vh, 1vh) * 100);
}
</style>
