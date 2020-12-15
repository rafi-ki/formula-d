<template>
  <v-container>
    <div>
      <v-btn
        class="ma-2"
        @click="startQualifying"
        outlined
        color="primary"
      >
        <v-icon
          left
          dark
        >
          mdi-traffic-light
        </v-icon>
        Start
      </v-btn>
    </div>
    <div
      v-for="(racer, index) in result"
      :key="index"
    >
      <v-chip
        v-show="racer.show"
        large
        class="ma-1"
        :color="index===0 ? 'success' : ''"
      >
        <v-avatar
          left
        >
          {{ index + 1 }}.
        </v-avatar>
        {{ racer.racer }}
      </v-chip>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Season } from '@/types/Season';

@Component
export default class QualifyingRollout extends Vue {
  result = [];

  mounted() {
    this.shuffle();
  }

  shuffle() {
    const qualiRacers = [...this.racers];
    this.shuffleArray(qualiRacers);
    const qualiResult = qualiRacers.map((x, i) => ({ racer: x, position: (i + 1), show: false }));
    qualiResult.sort((a, b) => a.position - b.position);
    this.result = qualiResult;
  }

  shuffleArray(array: string[]) {
    // eslint-disable-next-line no-plusplus
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  startQualifying() {
    this.shuffle();
    this.result.forEach((x) => {
      // eslint-disable-next-line no-return-assign,no-param-reassign
      setTimeout(() => x.show = true, 2000 * x.position);
    });
  }

  get latestSeason(): Season {
    return this.$store.getters.getLatestSeason;
  }

  get racers() {
    const races = Object.values(this.latestSeason.races);
    const racers = races.flatMap((x) => x.results.map((y) => y.racer));
    return [...new Set(racers)];
  }
}
</script>

<style scoped>

</style>
