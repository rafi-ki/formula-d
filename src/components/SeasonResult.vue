<template>
  <v-sheet
      class="mx-auto transition-swing rounded-lg"
      elevation="4"
      width="100%"
      color="green lighten-3"
  >
    <div class="container" v-if="!!season">
      <div class="text-h4"> {{ season.name }} - Rennen x/{{season.plannedRaces}}</div>
      <div class="text-subtitle-1">März 2020 - Oktober 2020</div>
      <result-table-comp :items="items"></result-table-comp>
    </div>
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
    if (!this.season)
      return false;
    return this.season.races.length === this.season.plannedRaces;
  }

  get items(): RaceResultItemDto[] {
    if (!this.season)
      return null;
    const seasonItems = this.season.races.flatMap(x => x.items);
    const groupedByName = seasonItems.reduce((r, a) => {
      r[a.racer] = [...r[a.racer] || [], a.points];
      return r;
    }, {});
    const pointsByRacer = Object.keys(groupedByName).map(x => {
      const points = groupedByName[x].reduce((r, a) => { return r+a; });
      return {
        racer: x,
        points: points
      }
    });
    return pointsByRacer.sort((a, b) => b.points - a.points).map((x, index) => {
      return {
        racer: x.racer,
        points: x.points,
        position: index+1
      }
    });
  }
}
</script>

<style scoped>

</style>
