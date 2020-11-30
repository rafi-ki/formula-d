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
        <div class="text-subtitle-1">
          Saisons: {{ stats.seasons }} | Rennen: {{ stats.races }}
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
        :items="season ? statsForSeason(season.id).racerStats : stats.racerStats"
        item-key="racer"
        class="elevation-1"
        hide-default-footer
        mobile-breakpoint="0"
        :options="options"
        no-data-text="Keine Rennergebnisse"
      />
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SeasonDto } from '@/types/Season';
import { Stats } from '@/types/Stats';
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
    { text: 'Punkte', value: 'points', align: 'center' },
    { text: 'Siege', value: 'wins', align: 'center' },
    { text: 'Podestplätze', value: 'podests', align: 'center' },
    { text: 'DNF', value: 'dnf', align: 'center' },
  ];

  options = {
    sortBy: ['points'],
    sortDesc: [true],
  };

  statsForSeason(seasonId: string): Stats {
    return this.$store.getters.getRacerStatsForSeason(seasonId);
  }

  get stats(): Stats {
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
