<template>
  <div>
    <div class="subtitle-1">
      Qualifying
      <v-btn
        v-if="!qualifying"
        icon
        @click="jumpToRollout"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-chip
      v-for="(racer, index) in qualifying"
      :key="index"
      class="ma-1"
      :color="index===0 ? 'success' : ''"
      outlined
    >
      <v-avatar left>
        {{ index + 1 }}.
      </v-avatar>
      {{ racer }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RaceDto } from '@/types/Season';

@Component
export default class Qualifying extends Vue {
  @Prop()
  qualifying!: string[];

  @Prop()
  race!: RaceDto;

  isPodest(index: number): boolean {
    return index === 0 || index === 1 || index === 2;
  }

  jumpToRollout(): void {
    this.$router.push('/luckycharm');
  }
}
</script>

<style scoped>

</style>
