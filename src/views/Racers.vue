<template>
  <v-container>
    <racer-stats-table />
    <div
      v-for="season in seasons"
      :key="season.id"
    >
      <racer-stats-table :season="season" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Season } from '@/types/Season';
import RacerStatsTable from '@/components/RacerStatsTable.vue';

@Component({
  components: { RacerStatsTable },
})
export default class Racers extends Vue {
  get seasons(): Season[] {
    if (!this.$store.state.seasons) { return []; }
    return this.$store.state.seasons;
  }
}
</script>

<style scoped>

</style>
