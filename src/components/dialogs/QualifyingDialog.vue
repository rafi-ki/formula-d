<template>
  <v-dialog
      v-model="dialog"
      @click:outside="cancel"
      max-width = 500
  >
    <v-card>
      <v-card-title class="headline">Qualifying</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
                v-model="qualifying"
                hint="Rennfahrer durch Beistrich getrennt."
                persistent-hint
                label="Beispiel: Podo, Markus, ..."
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="success"
            @click="done">
          Passt
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import * as firebase from "firebase";
import { RaceDto } from "@/types/Season";

@Component({
})
export default class QualifyingDialog extends Vue {
  @Prop()
  dialog = false;
  @Prop()
  seasonId!: string;
  @Prop()
  race!: RaceDto;

  qualifying = "";

  @Emit()
  closeDialog() {
    // empty on purpose
  }

  cancel() {
    this.closeDialog();
  }

  done() {
    const racers = this.qualifying.split(",").map(x => x.trim());
    const newRace = this.race;
    newRace.qualifying = racers;
    console.log(this.race);
    const raceRef = firebase.database().ref("seasons/" + this.seasonId + "/races/" + this.race.id);
    raceRef.set(newRace).then(() => {
      this.closeDialog();
    });
  }
}
</script>

<style scoped>

</style>
