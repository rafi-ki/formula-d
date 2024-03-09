<template>
  <v-dialog
    v-model="dialog"
    @click:outside="reset"
    max-width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-2 fab"
        v-bind="attrs"
        v-on="on"
        fab
        color="primary"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Saison
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Name"
              v-model="seasonName"
              placeholder="Lockdown Season 2"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Anzahl der Rennen"
              v-model="numberOfRaces"
              placeholder="5"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          @click="newSeason"
        >
          Passt
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import 'firebase/database';

@Component
export default class SeasonDialog extends Vue {
  dialog = false;

  seasonName: string | null = null;

  numberOfRaces: number | null = null;

  newSeason() {
    const newSeason = {
      name: this.seasonName,
      plannedRaces: this.numberOfRaces,
    };
    firebase.database().ref('seasons/').push(newSeason).then(() => {
      this.reset();
    });
  }

  reset() {
    this.seasonName = null;
    this.numberOfRaces = null;
    this.dialog = false;
  }
}
</script>

<style scoped>
.fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
