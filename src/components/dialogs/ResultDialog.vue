<template>
  <v-dialog
      v-model="dialog"
      @click:outside="cancel"
      max-width = 500
  >
    <v-card>
      <v-card-title class="headline">Qualifying</v-card-title>
      <v-card-text>
        <v-row col="12">
          <v-chip v-for="result in sortedResults" :key="result.racer" class="ma-1" outlined>
            <v-avatar left>
              {{ result.position }}.
            </v-avatar>
            {{ result.racer }}
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-combobox
                :items="racers"
                label="Rennfahrer"
                v-model="result.racer"></v-combobox>
          </v-col>
          <v-col cols="4">
            <v-select
                :items="positionItems"
                label="Position"
                v-model="result.position"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
                label="Punkte"
                v-model="result.points"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="next">
          Hinzufügen & Nächster
        </v-btn>
        <v-btn
            color="success"
            @click="done">
          <v-icon
              right
              dark
          >
            mdi-check
          </v-icon>
          Fertig
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { RaceDto, RaceResultItemDto } from "@/types/Season";
import * as firebase from "firebase/app";
import "firebase/database";

@Component
export default class ResultDialog extends Vue {
  @Prop()
  dialog = false;
  @Prop()
  seasonId!: string;
  @Prop()
  race!: RaceDto;

  result: RaceResultItemDto = this.createEmptyResult();

  racers = ["Podo", "Markus", "Rafi", "Georg", "Thomas", "Igor"];

  positionItems = [
    { text: "1", value: 1 },
    { text: "2", value: 2 },
    { text: "3", value: 3 },
    { text: "4", value: 4 },
    { text: "5", value: 5 },
    { text: "6", value: 6 },
    { text: "DNF", value: 0 },
  ];

  results: RaceResultItemDto[] = [];

  get sortedResults() {
    return this.results.sort((a, b) =>{
      if (a.position === 0)
        return 1;
      if (b.position === 0)
        return -1;
      return a.position - b.position
    } );
  }

  @Emit()
  closeDialog() {
    // empty on purpose
  }

  createEmptyResult() {
    return { racer: "", points: 0, position: 0 };
  }

  next() {
    this.results.push(this.result);
    this.result = this.createEmptyResult();
  }

  cancel() {
    this.results = [];
    this.closeDialog();
  }

  done() {
    const newRace = this.race;
    newRace.items = this.results;
    const raceRef = firebase.database().ref("seasons/" + this.seasonId + "/races/" + newRace.id);
    raceRef.set(newRace).then(() => {
      this.cancel();
    });
  }
}
</script>

<style scoped>

</style>
