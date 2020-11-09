<template>
  <div v-if="results">
    <v-chip
      v-if="winner"
      :small="!small"
      :x-small="small"
      class="mr-1"
      text-color="white"
      color="#D4AF37"
    >
      1. {{ winner }}
    </v-chip>
    <v-chip
      v-if="runnerUp"
      :small="!small"
      :x-small="small"
      class="mr-1"
      text-color="white"
      color="#C0C0C0"
    >
      2. {{ runnerUp }}
    </v-chip>
    <v-chip
      v-if="thirdPlace"
      :small="!small"
      :x-small="small"
      class="mr-1"
      text-color="white"
      color="#cd7f32"
    >
      3. {{ thirdPlace }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RacerResultDto } from '@/types/Season';

@Component
export default class Podest extends Vue {
  @Prop()
  results!: RacerResultDto[];

  @Prop()
  small!: boolean;

  get winner(): string | undefined {
    return this.results.find((x) => x.position === 1)?.racer;
  }

  get runnerUp(): string | undefined {
    return this.results.find((x) => x.position === 2)?.racer;
  }

  get thirdPlace(): string | undefined {
    return this.results.find((x) => x.position === 3)?.racer;
  }
}
</script>

<style scoped>

</style>
