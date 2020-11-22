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
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Rennfahrer
              </th>
              <th class="text-left">
                Siege
              </th>
              <th class="text-left">
                Podestplätze
              </th>
              <th class="text-left">
                DNF
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in season ? racerStats(season.id) : racerStats(null)"
              :key="item.racer"
            >
              <td>{{ item.racer }} </td>
              <td>{{ item.wins }}</td>
              <td>{{ item.podests }}</td>
              <td>{{ item.dnf }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
