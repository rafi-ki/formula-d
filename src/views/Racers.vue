<template>
  <v-container>
    <div
      v-for="season in seasons"
      :key="season.id"
    >
      <div class="text-h5">
        {{ season.name }} - Rennen {{ amountRaces(season) }}/{{ season.plannedRaces }}
      </div>
      <div class="text-subtitle-1">
        {{ season.start }} - {{ season.end }}
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
              v-for="item in racerStats(season.id)"
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
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SeasonDto } from '@/types/Season';

@Component
export default class Racers extends Vue {
  get seasons(): SeasonDto[] {
    if (!this.$store.state.seasons) { return []; }
    return Array.from(Object.values(this.$store.state.seasons));
  }

  racerStats(seasonId: string) {
    return this.$store.getters.getRacerStats(seasonId);
  }

  amountRaces(season: SeasonDto): number {
    if (!season?.races) { return 0; }
    return Object.keys(season.races).length;
  }
}
</script>

<style scoped>

</style>
