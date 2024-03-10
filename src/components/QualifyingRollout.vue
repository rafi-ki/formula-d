<template>
  <v-container>
    <div>
      <div class="text-h6">
        Qualifying für
        <span class="text-decoration-underline">{{ latestRace.name }}</span>
        <span v-if="latestRace.qualifying">&nbsp; beendet
          <v-icon
            color="green"
            large
          >mdi-check
          </v-icon>
        </span>
      </div>
      <div v-if="latestRace.qualifying">
        Für eine neues Qualifying muss zuerst ein neues Rennen angelegt werden.
      </div>
      <div v-if="!latestRace.qualifying">
        <v-btn
          :disabled="oneQualifierFinished"
          class="ma-2"
          @click="startQualifying"
          outlined
          color="primary"
        >
          Starten
        </v-btn>
        <v-btn
          :disabled="!allQualifiersFinished"
          class="ma-2"
          @click="acceptQualifying"
          outlined
          color="primary"
        >
          Nehm ich
        </v-btn>
      </div>
    </div>
    <div v-if="result.length > 0 && !allQualifiersFinished">
      <v-card
        class="mx-auto mt-2"
        max-width="500"
        loading
      >
        <v-card-title>Qualifying läuft ... </v-card-title>
      </v-card>
    </div>
    <qualifier-card
      v-for="(racer, index) in result"
      :key="index"
      :qualifier="racer"
      :position="index+1"
    />
    <div class="text-center ma-2">
      <v-snackbar
        v-model="snackbar"
        timeout="5000"
        color="success"
      >
        <v-icon
          color="white"
        >
          mdi-check
        </v-icon>
        Qualifying übernommen
      </v-snackbar>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  FactorLuck, Qualifier, RaceDto, Season,
} from '@/types/Season';
import QualifierCard from '@/components/QualifierCard.vue';
import firebase from 'firebase';
import 'firebase/database';

@Component({
  components: { QualifierCard },
})
export default class QualifyingRollout extends Vue {
  result: Qualifier[] = [];

  snackbar = false;

  private cmp(a: number, b: number) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
  }

  shuffle() {
    const qualiRacers = [...this.racers];
    this.shuffleArray(qualiRacers);
    const factorLuck = this.$store.getters.getFactorLuck(this.latestSeason.id) as FactorLuck[];
    this.result = qualiRacers
      .map((racer, i) => {
        let factor = 0;
        if (factorLuck.length > 0) {
          const fl = factorLuck.find((luck) => luck.racer === racer) as FactorLuck;
          factor = fl.factor;
        }
        const dicedPosition = (i + 1);
        return {
          racer,
          dicedPosition,
          finished: false,
          factorLuck: factor,
          sum: factor + dicedPosition,
        } as Qualifier;
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
    this.result.sort((a, b) => this.cmp(a.sum, b.sum) || this.cmp(a.factorLuck, b.factorLuck));
    const racersCount = this.racers.length;
    this.result.forEach((x, index) => {
      const delay = (racersCount - index);
      // eslint-disable-next-line no-return-assign,no-param-reassign
      setTimeout(() => x.finished = true, 4000 * delay);
    });
  }

  acceptQualifying() {
    if (!this.latestRace) {
      return;
    }
    const racers = this.result.map((x) => x.racer);
    const raceRef = firebase.database()
      .ref(`seasons/${this.latestSeason.id}/races/${this.latestRace.id}/qualifying`);
    raceRef.set(racers).then(() => {
      this.snackbar = true;
    });
  }

  get latestSeason(): Season {
    return this.$store.getters.getLatestSeasonWithRaces;
  }

  get latestRace(): RaceDto | null {
    const races = Object.values(this.latestSeason.races);
    if (races.length === 0) {
      return null;
    }
    return races.sort((a: RaceDto, b: RaceDto) => (b.order - a.order))[0];
  }

  get racers() {
    return ['Georg', 'Podo', 'Igor', 'Thomas', 'Rafi', 'Markus'];
  }

  get allQualifiersFinished() {
    if (this.result.length === 0) {
      return false;
    }
    return this.result.filter((x) => !x.finished).length === 0;
  }

  get oneQualifierFinished() {
    return this.result.filter((x) => x.finished).length >= 1;
  }
}
</script>

<style scoped>

</style>
