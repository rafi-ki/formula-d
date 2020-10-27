<template>
  <v-container v-if="!!races">
    <season-result :season="season"></season-result>
    <v-divider class="mt-5 mb-5"></v-divider>
    <v-expansion-panels>
      <v-expansion-panel v-if="!finished" readonly dark>
        <v-expansion-panel-header expand-icon="mdi-plus" @click.stop="dialog = true">
          Neues Rennen
        </v-expansion-panel-header>
      </v-expansion-panel>
      <v-expansion-panel v-for="race in races" :key="race.order">
        <v-expansion-panel-header>
          <div class="text-h5">
            <span class="mr-2">{{ race.order }}</span><span class="font-italic">"{{ race.name }}"</span>
            <div class="text-subtitle-1">{{ race.date }} @ {{ race.track }} </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>

          <qualifying v-if="race.qualifying" :qualifying="race.qualifying"></qualifying>
          <race-comp v-if="race.items" :race="race"></race-comp>
          <div class="mt-5">
            <v-btn v-if="!race.items" outlined>
              <v-icon left>
                mdi-plus
              </v-icon>
              Ergebnis
            </v-btn>
            <v-btn v-if="!race.qualifying" outlined class="ml-2" @click="qualifyingDialog = true">
              <v-icon left>
                mdi-plus
              </v-icon>
              Qualifying
            </v-btn>
          </div>
        </v-expansion-panel-content>
        <qualifying-dialog :dialog="qualifyingDialog" :season-id="$route.params.id" :race="race" @close-dialog="qualifyingDialog = false"></qualifying-dialog>

      </v-expansion-panel>
    </v-expansion-panels>
    <race-form-dialog :dialog="dialog" :season-id="$route.params.id" :last-order="lastOrder"  @close-dialog="dialog = false"></race-form-dialog>

  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import RaceComp from "@/components/RaceComp.vue";
import { RaceDto, SeasonDto } from "@/types/Season";
import SeasonResult from "@/components/SeasonResult.vue";
import RaceFormDialog from "@/components/dialogs/RaceFormDialog.vue";
import QualifyingDialog from "@/components/dialogs/QualifyingDialog.vue";
import Qualifying from "@/components/Qualifying.vue";

@Component({
  components: {
    Qualifying,
    QualifyingDialog,
    RaceFormDialog,
    SeasonResult,
    RaceComp
  }
})
export default class Season extends Vue {
  dialog = false;
  qualifyingDialog = false;

  get season(): SeasonDto {
    const id = this.$route.params.id;
    return this.$store.state.seasons[id as any] as SeasonDto;
  }

  get races(): RaceDto[] {
    if (this.season?.races)
      return Object.values(this.season.races).sort((a, b) => b.order - a.order);
    return [];
  }

  get lastOrder(): number {
    if (this.races.length > 0)
      return this.races[0].order;
    return 0;
  }

  get finished(): boolean {
    if (!this.season?.races)
      return false;
    return Object.keys(this.season.races).length === this.season.plannedRaces;
  }
}

</script>

<style scoped>

</style>
