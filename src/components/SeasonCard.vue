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
      {{ seasonDuration }}
    </v-card-subtitle>
    <v-card-text>
      Podest: {{ Podest }}
    </v-card-text>
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
          <div
            v-for="race in races"
            :key="race.name"
          >
            {{ race.name }}
          </div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RaceDto, RaceResultItemDto, SeasonDto } from '@/types/Season';

@Component
export default class SeasonCard extends Vue {
  @Prop()
  season!: SeasonDto;

  showRaces = false;

  move() {
    const path = `season/${this.season.id}`;
    this.$router.push({ path });
  }

  get commulated(): RaceResultItemDto[] {
    return this.$store.getters.getComulated(this.season.id);
  }

  get seasonDuration(): string {
    return `${this.season.start.toLocaleDateString('de')} - ${this.season.end.toLocaleDateString('de')}`;
  }

  get races(): RaceDto[] {
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
}
</script>

<style scoped>

</style>
