<template>
  <v-dialog
    max-width="500"
    v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        outlined
        class="ml-2"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          v-if="hasQualifying"
          left
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="!hasQualifying"
          left
        >
          mdi-plus
        </v-icon>
        Qualifying
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Qualifying
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="qualifying"
              hint="Rennfahrer durch Beistrich getrennt."
              persistent-hint
              label="Beispiel: Podo, Markus, ..."
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          @click="done"
        >
          Passt
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { RaceDto } from '@/types/Season';

@Component
export default class QualifyingDialog extends Vue {
  @Prop()
  seasonId!: string;

  @Prop()
  race!: RaceDto;

  dialog = false;

  qualifying = '';

  get hasQualifying(): boolean {
    return !!this.race.qualifying;
  }

  done() {
    const racers = this.qualifying.split(',').map((x) => x.trim());
    const updatedRace = this.race;
    updatedRace.qualifying = racers;
    const raceRef = firebase.database().ref(`seasons/${this.seasonId}/races/${this.race.id}`);
    raceRef.set(updatedRace).then(() => {
      this.dialog = false;
    });
  }
}
</script>

<style scoped>

</style>
