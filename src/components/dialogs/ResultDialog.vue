<template>
  <v-dialog
    max-width="500"
    v-model="dialog"
    @click:outside="reset"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="attrs"
        class="mx-1"
        outlined
        text
      >
        <v-icon
          left
          v-if="hasResult"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          left
          v-if="!hasResult"
        >
          mdi-plus
        </v-icon>
        Ergebnis
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Ergebnis
      </v-card-title>
      <v-card-text>
        <v-row col="12">
          <v-chip
            v-for="result in sortedResults"
            :key="result.racer"
            class="ma-1"
            outlined
            close
            @click:close="removeResult(result.racer)"
            small
          >
            <v-avatar left>
              {{ result.position }}.
            </v-avatar>
            {{ result.racer }} ({{ result.points }})
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-combobox
              :items="racers"
              label="Fahrer"
              v-model="result.racer"
            />
          </v-col>
          <v-col cols="4">
            <v-select
              :items="positionItems"
              label="Position"
              v-model.number="result.position"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Punkte"
              v-model.number="result.points"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          outlined
          @click="next"
        >
          Hinzufügen
        </v-btn>
        <v-btn
          color="success"
          @click="done"
        >
          <v-icon
            right
            dark
          >
            mdi-check
          </v-icon>
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
import { RaceDto, RacerResultDto } from '@/types/Season';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Component
export default class ResultDialog extends Vue {
  @Prop()
  seasonId!: string;

  @Prop()
  race!: RaceDto;

  dialog = false;

  result: RacerResultDto = this.createEmptyResult();

  racers = ['Podo', 'Markus', 'Rafi', 'Georg', 'Thomas', 'Igor'];

  positionItems = [
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
    { text: '6', value: 6 },
    { text: 'DNF', value: 0 },
  ];

  results: RacerResultDto[] = [];

  mounted() {
    this.results = this.race.results;
  }

  get sortedResults() {
    return this.results.sort((a, b) => {
      if (a.position === 0) { return 1; }
      if (b.position === 0) { return -1; }
      return a.position - b.position;
    });
  }

  get hasResult(): boolean {
    return !!this.race.results;
  }

  removeResult(racer: string) {
    this.results = this.results.filter((x) => x.racer !== racer);
  }

  createEmptyResult() {
    return { racer: '', points: 0, position: 0 };
  }

  next() {
    if (!this.result.racer) {
      return;
    }
    this.results.push(this.result);
    this.result = this.createEmptyResult();
  }

  reset() {
    this.results = this.race.results;
  }

  done() {
    const resultsRef = firebase.database().ref(`seasons/${this.seasonId}/races/${this.race.id}/results`);
    resultsRef.set(this.results).then(() => {
      this.dialog = false;
      this.reset();
    });
  }
}
</script>

<style scoped>

</style>
