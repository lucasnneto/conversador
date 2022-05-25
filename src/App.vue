<template>
  <v-app>
    <v-main>
      <home />
    </v-main>
  </v-app>
</template>

<script>
import home from "@/components/Home.vue";
export default {
  name: "App",
  components: {
    home,
  },
};
</script>
