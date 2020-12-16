<template>
  <v-container v-if="this.$store.state.seasons.length > 0">
    <div class="text-h5">
      {{ latestSeason.name }} <br>
    </div>
    <v-subheader>Aktuelle Saison</v-subheader>
    <v-tabs
      v-model="tab"
    >
      <v-tab>Qualifying</v-tab>
      <v-tab>Glücksfaktor</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <QualifyingRollout />
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <div class="text-h6">
            Glücksfaktor: Das Unfassbare
          </div>
          <v-subheader>
            Nach {{ Object.keys(latestSeason.races).length }}
            von {{ latestSeason.plannedRaces }} Rennen
          </v-subheader>
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
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FactorLuck, RaceDto, Season } from '@/types/Season';
import QualifyingRollout from '@/components/QualifyingRollout.vue';

@Component({
  components: { QualifyingRollout },
})
export default class LuckyCharm extends Vue {
  tab = null;

  mapFactorLuck(race: RaceDto): FactorLuck[] {
    if (!race.qualifying) { return []; }
    const racersCount = race.qualifying.length;
    return race.qualifying.map((y, i) => ({
      racer: y,
      factor: (racersCount / 2) + 0.5 - (i + 1),
    }));
  }

  get latestSeason(): Season {
    return this.$store.getters.getLatestSeason;
  }

  get factorLuck(): FactorLuck[] {
    const season = this.latestSeason;
    const races = Object.values(season.races)
      .filter((x) => x.order !== 1)
      .filter((x) => x.qualifying);
    const factorsLuck = races.flatMap(this.mapFactorLuck);
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
