<template>
  <v-container v-if="season">
    <div class="text-h5"> {{ season.name }} - Rennen {{amountRaces}}/{{season.plannedRaces}}</div>
    <div class="text-subtitle-1">{{ season.start }} - {{ season.end }}</div>
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
            v-for="item in racerStats"
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

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SeasonDto } from "@/types/Season";

@Component
export default class Racers extends Vue {

  private seasonId = "266441B9-9F08-4A1C-A04B-C1B6691C8519"

  get season(): SeasonDto {
    return this.$store.state.seasons[this.seasonId as any] as SeasonDto;
  }

  get racerStats() {
    return this.$store.getters.getRacerStats(this.seasonId);
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
