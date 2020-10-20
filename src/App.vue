<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Formula D
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import Home from "@/views/Home.vue";

export default Vue.extend({
  name: "App",

  components: {
    Home,
    // HelloWorld
  },

  data: () => ({
    //
  })
});
</script>
