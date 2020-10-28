<template>
  <v-dialog
    v-model="dialog"
    @click:outside="cancel"
    max-width="500"
  >
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
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { RaceDto } from '@/types/Season';

@Component
export default class RaceFormDialog extends Vue {
  @Prop()
  dialog = false;

  @Prop()
  seasonId!: string;

  @Prop()
  lastOrder!: number;

  raceDate = this.todayString();

  raceName = '';

  raceTrack = '';

  @Emit()
  closeDialog() {
    // empty on purpose
  }

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

  cancel() {
    this.closeDialog();
  }

  reset() {
    this.raceDate = this.todayString();
  }

  todayString(): string {
    return new Date().toISOString().substring(0, 10);
  }
}
</script>

<style scoped>

</style>
