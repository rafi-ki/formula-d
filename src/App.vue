<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Formula D
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as firebase from "firebase";
import { SeasonDto } from "@/types/Season";

@Component()
export default class App extends Vue {
  mounted() {
    const seasonsRef = firebase.database().ref("seasons");
    seasonsRef.on("value", snapshot => {
      const seasons = snapshot.val() as SeasonDto[];
      this.$store.commit("SetSeasons", seasons);
    });
  }
}
</script>
