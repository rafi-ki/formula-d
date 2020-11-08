<template>
  <v-card
    class="elevation-2 mb-4 mx-auto"
    max-width="50em"
  >
    <v-card-title>
      <v-icon
        class="primary rounded-circle mr-2"
        dark
      >
        mdi-numeric-{{ race.order }}
      </v-icon>
      {{ race.name }}
    </v-card-title>
    <v-card-subtitle>
      <v-chip
        v-if="race.results"
        small
        outlined
        class="mr-1"
        color="success"
      >
        {{ winner }}
      </v-chip>
      {{ race.date }} @ {{ race.track }}
    </v-card-subtitle>
    <v-card-actions>
      <qualifying-dialog
        :season-id="$route.params.id"
        :race="race"
      />
      <result-dialog
        :season-id="$route.params.id"
        :race="race"
      />
      <v-spacer />
      <v-btn
        v-if="race.qualifying || race.results"
        icon
        @click="expanded = !expanded"
      >
        <v-icon>{{ expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card-text v-show="expanded">
        <qualifying
          v-if="race.qualifying"
          :qualifying="race.qualifying"
        />
        <race
          v-if="race.results"
          :race="race"
        />
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RaceDto } from '@/types/Season';
import Qualifying from '@/components/Qualifying.vue';
import Race from '@/components/Race.vue';
import QualifyingDialog from '@/components/dialogs/QualifyingDialog.vue';
import ResultDialog from '@/components/dialogs/ResultDialog.vue';

@Component({
  components: {
    Qualifying,
    Race,
    QualifyingDialog,
    ResultDialog,
  },
})
export default class RaceDetails extends Vue {
  @Prop()
  race!: RaceDto;

  expanded = false;

  get winner() {
    if (this.race.results) {
      return this.race.results.find((x) => x.position === 1)?.racer;
    }
    return 'keiner';
  }
}
</script>

<style scoped>

</style>
