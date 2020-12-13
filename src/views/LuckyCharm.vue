<template>
  <v-container v-if="this.$store.state.seasons.length > 0">
    <div class="text-h5">
      Glücksfaktor: Das Unfassbare
    </div>
    <div class="subtitle-1">
      Season: {{ latestSeason.name }} <br>
      Rennen: {{ Object.keys(latestSeason.races).length }} von {{ latestSeason.plannedRaces }}
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Rennfahrer
            </th>
            <th class="text-left">
              Glücksfaktor
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in factorLuck"
            :key="item.racer"
          >
            <td>{{ item.racer }}</td>
            <td>{{ item.factor }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FactorLuck, RaceDto, Season } from '@/types/Season';

@Component
export default class LuckyCharm extends Vue {
  compareStart(a: Season, b: Season): number {
    if (a.start && b.start) {
      return a.start.getTime() - b.start.getTime();
    }
    return -1;
  }

  get latestSeason(): Season {
    const sortedSeasons = [...this.$store.state.seasons].sort(this.compareStart);
    return sortedSeasons[sortedSeasons.length - 1];
  }

  mapFactorLuck(race: RaceDto): FactorLuck[] {
    if (!race.qualifying) { return []; }
    const racersCount = race.qualifying.length;
    return race.qualifying.map((y, i) => ({
      racer: y,
      factor: (racersCount / 2) + 0.5 - (i + 1),
    }));
  }

  get factorLuck(): FactorLuck[] {
    const season = this.latestSeason;
    const races = Object.values(season.races)
      .filter((x) => x.order !== 1)
      .filter((x) => x.qualifying);
    const factorsLuck = races.flatMap(this.mapFactorLuck);
    console.log(factorsLuck);
    const groupedByName = factorsLuck.reduce((r: any, a: FactorLuck) => {
      // eslint-disable-next-line
      r[a.racer] = [...r[a.racer] || [], a.factor];
      return r;
    }, []);
    const racers = Object.keys(groupedByName);
    return racers.map((racer: string) => {
      const factor = groupedByName[racer].reduce((a: number, b: number) => a + b, 0);
      return {
        racer,
        factor,
      };
    });
  }
}
</script>

<style scoped>

</style>
