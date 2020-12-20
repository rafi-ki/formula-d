<template>
  <v-container v-if="this.$store.state.seasons.length > 0">
    <div class="text-h5">
      {{ latestSeason.name }} <br>
    </div>
    <v-tabs
      v-model="tab"
    >
      <v-tab>Qualifying</v-tab>
      <v-tab>Glücksfaktor</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <qualifying-rollout />
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
import { FactorLuck, Season } from '@/types/Season';
import QualifyingRollout from '@/components/QualifyingRollout.vue';

@Component({
  components: { QualifyingRollout },
})
export default class LuckyCharm extends Vue {
  tab = null;

  get latestSeason(): Season {
    return this.$store.getters.getLatestSeason;
  }

  get factorLuck(): FactorLuck[] {
    return this.$store.getters.getFactorLuck(this.latestSeason.id);
  }
}
</script>

<style scoped>

</style>
