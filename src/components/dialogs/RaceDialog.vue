<template>
  <v-dialog
    v-model="dialog"
    @click:outside="closeDialog"
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
        Rennen
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Name"
              v-model="raceName"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Strecke"
              v-model="raceTrack"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Datum"
              v-model="raceDate"
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
export default class RaceFormDialog extends Vue {
  dialog = false;

  @Prop()
  seasonId!: string;

  @Prop()
  lastOrder!: number;

  raceDate = this.todayString();

  raceName = '';

  raceTrack = '';

  done() {
    const raceDto = {
      name: this.raceName,
      track: this.raceTrack,
      date: this.raceDate,
      order: this.lastOrder + 1,
    } as RaceDto;
    const raceId = firebase.database().ref(`seasons/${this.seasonId}/races`).push(raceDto).key;
    if (raceId) { raceDto.id = raceId; }
    const raceRef = firebase.database().ref(`seasons/${this.seasonId}/races/${raceDto.id}`);
    raceRef.set(raceDto).then(() => {
      this.closeDialog();
    });
  }

  closeDialog() {
    this.reset();
    this.dialog = false;
  }

  reset() {
    this.raceDate = this.todayString();
    this.raceName = '';
    this.raceTrack = '';
  }

  todayString(): string {
    return new Date().toISOString().substring(0, 10);
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
