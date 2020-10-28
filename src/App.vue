<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn
        text
        @click="toHome"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        text
        @click="toRacers"
      >
        <v-icon>mdi-racing-helmet</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { SeasonDto } from '@/types/Season';

@Component
export default class App extends Vue {
  mounted() {
    const seasonsRef = firebase.database().ref('seasons');
    seasonsRef.on('value', (snapshot) => {
      const seasons = snapshot.val() as SeasonDto[];
      this.$store.commit('SetSeasons', seasons);
    });
  }

  toHome() {
    this.$router.push('/');
  }

  toRacers() {
    this.$router.push('/racers');
  }
}
</script>
