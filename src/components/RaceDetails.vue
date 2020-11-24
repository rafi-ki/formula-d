<template>
  <v-card
    class="elevation-2 mb-4 mx-auto"
    max-width="50em"
  >
    <v-card-title class="race-card-title">
      <v-icon
        color="primary"
        large
      >
        mdi-numeric-{{ race.order }}
      </v-icon>
      <span>{{ race.name }}</span>
    </v-card-title>
    <v-card-subtitle>
      <podest :results="race.results" />
      <div class="mt-1">
        {{ race.date }} @ {{ race.track }}
      </div>
    </v-card-subtitle>
    <v-card-actions>
      <race-dialog
        :season-id="$route.params.id"
        :race="race"
      />
      <v-spacer />
      <v-btn
        icon
        @click="expanded = !expanded"
      >
        <v-icon>{{ expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="expanded">
        <v-divider />
        <v-card-text>
          <qualifying
            :qualifying="race.qualifying"
            :race="race"
          />
          <race
            :race="race"
          />
        </v-card-text>
      </div>
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
import Podest from '@/components/Podest.vue';
import RaceDialog from '@/components/dialogs/RaceDialog.vue';

@Component({
  components: {
    RaceDialog,
    Qualifying,
    Race,
    QualifyingDialog,
    ResultDialog,
    Podest,
  },
})
export default class RaceDetails extends Vue {
  @Prop()
  race!: RaceDto;

  expanded = false;
}
</script>

<style scoped>
.race-card-title {
  display: block;
  line-break: normal;
}
</style>
