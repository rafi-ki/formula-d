<template>
  <v-card
    v-show="qualifier.finished"
    class="mx-auto mt-2"
    max-width="500"
    outlined
  >
    <v-card-title>{{ position }}. {{ qualifier.racer }}</v-card-title>
    <v-card-subtitle>
      <div>
        Gewürfelt: {{ qualifier.dicedPosition }} + Glücksfaktor: {{ qualifier.factorLuck }}
        = {{ qualifier.sum }}
      </div>
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Qualifier } from '@/types/Season';

@Component
export default class QualifierCard extends Vue {
  @Prop()
  qualifier!: Qualifier;

  @Prop()
  position!: number;
}
</script>

<style scoped>

</style>
