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
          v-for="item in items"
          :key="item.racer"
          :class="{'red lighten-2': item.position===0}"
      >
        <td>{{ item.position | position }} <span v-if="qualifyingPosition(item) !== 0">({{qualifyingPosition(item)}})</span></td>
        <td :class="{'text-decoration-line-through': item.position===0}">{{ item.racer }}</td>
        <td>{{ item.points }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RaceResultItemDto } from "@/types/Season";

@Component
export default class ResultTableComp extends Vue {
  @Prop()
  items!: RaceResultItemDto[];

  @Prop()
  qualifying?: string[];

  qualifyingPosition(item: RaceResultItemDto): number {
    if (!this.qualifying)
      return 0;
    return this.qualifying.indexOf(item.racer) + 1;
  }
}
</script>

<style scoped>

</style>
