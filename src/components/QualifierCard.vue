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
        <v-chip
          outlined
        >
          {{ qualifier.sum }}
        </v-chip>
        =
        <v-chip
          small
          outlined
        >
          <v-avatar
            left
          >
            <v-icon color="grey">
              mdi-clover
            </v-icon>
          </v-avatar>
          {{ qualifier.factorLuck }}
        </v-chip>
        +
        <v-chip
          small
          outlined
        >
          <v-avatar
            left
          >
            <v-icon color="grey">
              mdi-dice-3
            </v-icon>
          </v-avatar>
          {{ qualifier.dicedPosition }}
        </v-chip>
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
