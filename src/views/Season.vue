<template>
  <v-container v-if="!!races">
    <season-result :season="season"></season-result>
    <v-divider class="mt-5 mb-5"></v-divider>
    <v-expansion-panels >
      <v-expansion-panel v-if="!finished" readonly>
        <v-expansion-panel-header expand-icon="mdi-plus" color="success lighten-1" @click.stop="dialog = true">
          Hinzufügen
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
          <race-comp  :result="race"></race-comp>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <race-form-dialog :dialog="dialog" @close-dialog="dialog = false"></race-form-dialog>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import RaceComp from "@/components/RaceComp.vue";
import { RaceDto, SeasonDto } from "@/types/Season";
import SeasonResult from "@/components/SeasonResult.vue";
import RaceFormDialog from "@/components/RaceFormDialog.vue";

@Component({
  components: {
    RaceFormDialog,
    SeasonResult,
    RaceComp
  }
})
export default class Season extends Vue {
  dialog = false;

  get season(): SeasonDto {
    const id = this.$route.params.id;
    return this.$store.state.seasons[id as any] as SeasonDto;
  }

  get races(): RaceDto[] {
    if (this.season?.races)
      return this.season.races.sort((a, b) => b.order - a.order);
    return [];
  }

  get finished(): boolean {
    if (!this.season?.races)
      return false;
    return this.season.races.length === this.season.plannedRaces;
  }
}

</script>

<style scoped>

</style>
