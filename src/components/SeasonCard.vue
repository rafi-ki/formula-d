<template>
  <v-card
    v-if="!!season"
    class="mx-auto mt-2"
    max-width="500"
    outlined
  >
    <v-card-title>
      {{ season.name }}
    </v-card-title>
    <v-card-subtitle>
      <span>{{ seasonDuration }}</span>
      <v-chip
        v-if="!seasonOver"
        small
        color="success"
        class="ml-2"
      >
        aktiv
      </v-chip>
      <div v-if="Podest">
        Stand: {{ Podest }}
      </div>
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
            <span v-if="!seasonOver">Heute</span>
            <span v-if="seasonOver">Ende</span>
          </div>
          <v-timeline
            dense
          >
            <v-timeline-item
              v-for="race in races"
              :key="race.id"
              small
            >
              <div class="font-weight-normal">
                <strong>{{ race.name }}</strong>
                <div>
                  <v-chip
                    v-if="race.results"
                    x-small
                    outlined
                    class="mr-1"
                    color="success"
                  >
                    {{ getWinner(race) }}
                  </v-chip>
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
import { RaceDto, RacerResultDto, SeasonDto } from '@/types/Season';

@Component
export default class SeasonCard extends Vue {
  @Prop()
  season!: SeasonDto;

  showRaces = false;

  move() {
    const path = `season/${this.season.id}`;
    this.$router.push({ path });
  }

  get commulated(): RacerResultDto[] {
    return this.$store.getters.getComulated(this.season.id);
  }

  get seasonDuration(): string {
    return `${this.season.start.toLocaleDateString('de')} - ${this.season.end.toLocaleDateString('de')}`;
  }

  get races(): RaceDto[] {
    if (!this.season.races) return [];
    return Object.values(this.season.races).sort((a, b) => b.order - a.order);
  }

  get Podest(): string {
    const { commulated } = this;
    let podest = '';
    if (commulated.length > 0) { podest = podest.concat(`1.${commulated[0].racer}`); }
    if (commulated.length > 1) { podest = podest.concat(` | 2.${commulated[1].racer}`); }
    if (commulated.length > 2) { podest = podest.concat(` | 3. ${commulated[2].racer}`); }
    return podest;
  }

  getWinner(race: RaceDto) {
    if (race.results) {
      return race.results.find((x) => x.position === 1)?.racer;
    }
    return 'keiner';
  }

  get seasonOver(): boolean {
    if (!this.season.races) {
      return false;
    }
    return Object.keys(this.season.races).length === this.season.plannedRaces;
  }
}
</script>

<style scoped>

</style>
