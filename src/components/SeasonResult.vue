<template>
  <v-sheet
    class="mx-auto transition-swing rounded-lg"
    elevation="4"
    width="100%"
    max-width="50em"
  >
    <v-container v-if="!!season">
      <div class="text-h5">
        {{ season.name }} - Rennen {{ amountRaces }}/{{ season.plannedRaces }}
      </div>
      <div class="text-subtitle-1">
        {{ season.duration() }}
      </div>
      <result-table :results="results" />
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RacerResultDto, Season } from '@/types/Season';
import ResultTable from '@/components/ResultTable.vue';

@Component({
  components: { ResultTable },
})
export default class SeasonResult extends Vue {
  @Prop()
  season!: Season;

  get finished(): boolean {
    if (!this.season?.races) { return false; }
    return this.amountRaces === this.season.plannedRaces;
  }

  get results(): RacerResultDto[] {
    if (!this.season) { return []; }
    return this.$store.getters.getComulated(this.season.id);
  }

  get amountRaces(): number {
    if (!this.season?.races) { return 0; }
    return Object.keys(this.season.races).length;
  }
}
</script>

<style scoped>

</style>
