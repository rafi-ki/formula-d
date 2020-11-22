<template>
  <v-sheet
    class="transition-swing mb-2"
    outlined
  >
    <v-container>
      <div v-if="!season">
        <div class="text-h5">
          Gesamtstatistik
        </div>
      </div>
      <div v-if="season">
        <div class="text-h5">
          {{ season.name }} - Rennen {{ amountRaces(season) }}/{{ season.plannedRaces }}
        </div>
        <div class="text-subtitle-1">
          {{ season.duration() }}
        </div>
      </div>
      <v-data-table
        dense
        :headers="headers"
        :items="season ? racerStats(season.id) : racerStats(null)"
        item-key="racer"
        class="elevation-1"
        hide-default-footer
        mobile-breakpoint="0"
        :options="options"
      />
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SeasonDto } from '@/types/Season';
import Qualifying from './Qualifying.vue';
import Race from './Race.vue';
import QualifyingDialog from './dialogs/QualifyingDialog.vue';
import ResultDialog from './dialogs/ResultDialog.vue';
import Podest from './Podest.vue';

@Component({
  components: {
    Qualifying,
    Race,
    QualifyingDialog,
    ResultDialog,
    Podest,
  },
})
export default class RacerStatsTable extends Vue {
  @Prop()
  season!: SeasonDto;

  headers = [
    {
      text: 'Rennfahrer',
      align: 'start',
      value: 'racer',
    },
    { text: 'Siege', value: 'wins' },
    { text: 'Podestplätze', value: 'podests' },
    { text: 'DNF', value: 'dnf' },
  ];

  options = {
    sortBy: ['wins'],
    sortDesc: [true],
  };

  racerStats(seasonId: string) {
    if (seasonId) return this.$store.getters.getRacerStatsForSeason(seasonId);
    return this.$store.getters.getRacerStats;
  }

  amountRaces(season: SeasonDto): number {
    if (!season?.races) { return 0; }
    return Object.keys(season.races).length;
  }
}
</script>

<style scoped>

</style>
