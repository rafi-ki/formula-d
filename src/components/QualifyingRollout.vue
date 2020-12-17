<template>
  <v-container>
    <div>
      <v-btn
        class="ma-2"
        @click="startQualifying"
        outlined
        color="primary"
      >
        Start
      </v-btn>
    </div>
    <qualifier-card
      v-for="(racer, index) in result"
      :key="index"
      :qualifier="racer"
      :position="index+1"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FactorLuck, Qualifier, Season } from '@/types/Season';
import QualifierCard from '@/components/QualifierCard.vue';

@Component({
  components: { QualifierCard },
})
export default class QualifyingRollout extends Vue {
  result: Qualifier[] = [];

  mounted() {
    this.shuffle();
  }

  private cmp(a: number, b: number) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
  }

  shuffle() {
    const qualiRacers = [...this.racers];
    this.shuffleArray(qualiRacers);
    const qualiResult = qualiRacers
      .map((x, i) => (
        {
          racer: x,
          dicedPosition: (i + 1),
          finished: false,
          factorLuck: 0,
        } as Qualifier
      ));
    qualiResult.sort(
      (a, b) => this.cmp(a.dicedPosition, b.dicedPosition),
    );
    this.result = qualiResult;
  }

  addFactorLuck() {
    const factorLuck = this.$store.getters.getFactorLuck(this.latestSeason.id) as FactorLuck[];
    this.result = this.result.map((r) => {
      const { factor } = factorLuck.find((x) => x.racer === r.racer) as FactorLuck;
      return { ...r, factorLuck: factor, sum: factor + r.dicedPosition } as Qualifier;
    });
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
    this.addFactorLuck();
    this.result.sort((a, b) => this.cmp(a.sum, b.sum) || this.cmp(b.factorLuck, a.factorLuck));
    const racersCount = this.racers.length;
    this.result.forEach((x, index) => {
      const delay = (racersCount - index);
      // eslint-disable-next-line no-return-assign,no-param-reassign
      setTimeout(() => x.finished = true, 4000 * delay);
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
