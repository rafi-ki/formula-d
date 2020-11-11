<template>
  <v-card
    v-if="!!season"
    class="mx-auto mt-2"
    max-width="500"
    outlined
    :raised="!season.isOver()"
  >
    <v-card-title style="word-break: normal">
      <div>
        {{ season.name }}
      </div>
    </v-card-title>
    <v-card-subtitle>
      <span>{{ season.duration() }}</span>
      <podest :results="commulated" />
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        text
        @click="move"
        color="primary"
        outlined
      >
        Ansehen
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="races.length > 0"
        @click="showRaces = !showRaces"
        text
      >
        {{ races.length }}/{{ season.plannedRaces }}
        <v-icon>
          {{ showRaces ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showRaces">
        <v-divider />
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            <span v-if="!season.isOver()">Heute</span>
            <span v-if="season.isOver()">Ende</span>
          </div>
          <v-timeline
            dense
          >
            <v-timeline-item
              v-for="race in races"
              :key="race.id"
              small
              :icon="`mdi-numeric-${race.order}`"
            >
              <div class="font-weight-normal">
                <strong>{{ race.name }}</strong>
                <podest
                  :results="race.results"
                  :small="true"
                />
                <div>
                  {{ race.date }} @ {{ race.track }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  RaceDto, RacerResultDto, Season,
} from '@/types/Season';
import Podest from '@/components/Podest.vue';

@Component({
  components: {
    Podest,
  },
})
export default class SeasonCard extends Vue {
  @Prop()
  season!: Season;

  showRaces = false;

  move() {
    const path = `season/${this.season.id}`;
    this.$router.push({ path });
  }

  get commulated(): RacerResultDto[] {
    return this.$store.getters.getComulated(this.season.id);
  }

  get races(): RaceDto[] {
    if (!this.season.races) return [];
    return Object.values(this.season.races).sort((a, b) => b.order - a.order);
  }
}
</script>

<style scoped>
.active-badge {
  line-height: 2rem;
}
</style>
