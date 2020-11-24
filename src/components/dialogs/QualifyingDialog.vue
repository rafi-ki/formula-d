<template>
  <v-dialog
    max-width="500"
    v-model="dialog"
    @click:outside="reset"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-2"
        v-bind="attrs"
        v-on="on"
        icon
      >
        <v-icon
          v-if="hasQualifying"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="!hasQualifying"
        >
          mdi-plus
        </v-icon>
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
              clearable
              prepend-inner-icon="mdi-shuffle"
              @click:prepend-inner="shuffle"
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

  qualifying = this.race.qualifying ? this.race.qualifying.toString() : '';

  get hasQualifying(): boolean {
    return !!this.race.qualifying;
  }

  reset() {
    this.qualifying = this.race.qualifying ? this.race.qualifying.toString() : '';
  }

  done() {
    const racers = this.qualifying.split(',').map((x) => x.trim());
    const raceRef = firebase.database().ref(`seasons/${this.seasonId}/races/${this.race.id}/qualifying`);
    raceRef.set(racers).then(() => {
      this.dialog = false;
      this.reset();
    });
  }

  shuffle() {
    const racers = this.qualifying.split(',').map((x) => x.trim());
    this.shuffleArray(racers);
    this.qualifying = racers.toString();
  }

  shuffleArray(array: string[]) {
    // eslint-disable-next-line no-plusplus
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
</script>

<style scoped>

</style>
