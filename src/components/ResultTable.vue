<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Position <span v-if="qualifying">(Q)</span>
          </th>
          <th class="text-left">
            Rennfahrer
          </th>
          <th class="text-left">
            Punkte
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="r in results"
          :key="r.racer"
          :class="{'red lighten-2': r.position===0}"
        >
          <td>
            {{ r.position | position }}
            <span v-if="qualifyingPosition(r) !== 0">({{ qualifyingPosition(r) }})</span>
          </td>
          <td :class="{'text-decoration-line-through': r.position===0}">
            {{ r.racer }}
          </td>
          <td>{{ r.points }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RacerResultDto } from '@/types/Season';

@Component
export default class ResultTableComp extends Vue {
  @Prop()
  results!: RacerResultDto[];

  @Prop()
  qualifying?: string[];

  qualifyingPosition(r: RacerResultDto): number {
    if (!this.qualifying) { return 0; }
    return this.qualifying.indexOf(r.racer) + 1;
  }
}
</script>

<style scoped>

</style>
