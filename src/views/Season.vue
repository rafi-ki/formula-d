<template>
  <v-container v-if="!!races">
    <season-result :season="season" />
    <v-divider class="mt-5 mb-5" />
    <race-details
      v-for="race in races"
      :key="race.id"
      :race="race"
      :id="race.id"
      :expanded-initially="isExpanded(race.id)"
    />
    <race-form-dialog
      :season-id="$route.params.id"
      :order="lastOrder + 1"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Race from '@/components/Race.vue';
import { RaceDto, SeasonDto } from '@/types/Season';
import RaceFormDialog from '@/components/dialogs/RaceDialog.vue';
import RaceDetails from '@/components/RaceDetails.vue';
import SeasonResult from '@/components/SeasonResult.vue';

@Component({
  components: {
    RaceFormDialog,
    SeasonResult,
    Race,
    RaceDetails,
  },
})
export default class Season extends Vue {
  isExpanded(raceId: string) {
    return this.$route.hash === `#${raceId}`;
  }

  get season(): SeasonDto {
    const { id } = this.$route.params;
    return this.$store.getters.getSeason(id);
  }

  get races(): RaceDto[] {
    if (this.season?.races) {
      return Object.values(this.season.races).sort((a, b) => b.order - a.order);
    }
    return [];
  }

  get lastOrder(): number {
    if (this.races.length > 0) { return this.races[0].order; }
    return 0;
  }

  get finished(): boolean {
    if (!this.season?.races) { return false; }
    return Object.keys(this.season.races).length === this.season.plannedRaces;
  }
}

</script>

<style scoped>

</style>
