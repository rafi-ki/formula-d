<template>
  <v-sheet
      class="mx-auto transition-swing rounded-lg"
      elevation="4"
      width="100%"
      max-width="50em"
      color="green lighten-3"
  >
    <v-container v-if="!!season">
      <div class="text-h5"> {{ season.name }} - Rennen {{amountRaces}}/{{season.plannedRaces}}</div>
      <div class="text-subtitle-1">{{ season.start }} - {{ season.end }}</div>
      <result-table-comp :items="items"></result-table-comp>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RaceResultItemDto, SeasonDto } from "@/types/Season";
import ResultTableComp from "@/components/ResultTableComp.vue";
@Component({
  components: {ResultTableComp}
})
export default class SeasonResult extends Vue {
  @Prop()
  season!: SeasonDto;

  get finished(): boolean {
    if (!this.season?.races)
      return false;
    return this.season.races.length === this.season.plannedRaces;
  }

  get items(): RaceResultItemDto[] {
    if (!this.season)
      return [];
    return this.$store.getters.getComulated(this.season.id);
  }

  get amountRaces(): number {
    if (!this.season?.races)
      return 0;
    return this.season.races.length;
  }
}
</script>

<style scoped>

</style>
