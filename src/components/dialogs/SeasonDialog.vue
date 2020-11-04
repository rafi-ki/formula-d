<template>
  <v-dialog
    v-model="dialog"
    @click:outside="dialog = false"
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
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Rennen"
              v-model="numberOfRaces"
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
import * as firebase from 'firebase/app';
import 'firebase/database';

@Component
export default class SeasonDialog extends Vue {
  dialog = false;

  seasonName: string | null = null;

  numberOfRaces: number | null = null;

  newSeason() {
    const saison = {
      name: this.seasonName,
      plannedRaces: this.numberOfRaces,
    };
    firebase.database().ref('seasons/').push(saison).then(() => {
      this.dialog = false;
    });
  }
}
</script>

<style scoped>
.fab {
  position: fixed;
  right: 50px;
  bottom: 50px;
}
</style>
