<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div
        @click="toHome"
        class="mr-2"
      >
        <span class="text-h5">Formula D</span>
      </div>
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
      <v-btn
        text
        @click="toLuckyCharm"
      >
        <v-icon>mdi-clover</v-icon>
      </v-btn>
      <v-spacer />
      <v-menu
        bottom
        left
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-subheader>{{ email }}</v-subheader>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-title @click="toRules()">
                Regelwerk
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="isAuthenticated"
              @click="logout()"
            >
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="!isAuthenticated"
              @click="login()"
            >
              <v-list-item-title>
                Login
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import { SeasonDto } from '@/types/Season';


@Component
export default class App extends Vue {
  isAuthenticated = false;

  email = 'unknown';

  mounted() {
    const seasonsRef = firebase.database().ref('seasons');
    seasonsRef.on('value', (snapshot) => {
      const seasons = snapshot.val() as SeasonDto[];
      this.$store.commit('SetSeasons', seasons);
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.email = user.displayName ? user.displayName : 'unbekannt';
      } else {
        this.isAuthenticated = false;
        this.email = 'unbekannt';
      }
    });
  }

  logout() {
    firebase.auth().signOut();
  }

  login() {
    this.$router.push('/auth').catch((x) => x);
  }

  toHome() {
    this.$router.push('/').catch((x) => x);
  }

  toRacers() {
    this.$router.push('/racers').catch((x) => x);
  }

  toLuckyCharm() {
    this.$router.push('/luckycharm').catch((x) => x);
  }

  toRules() {
    this.$router.push('/rules').catch((x) => x);
  }
}
</script>
