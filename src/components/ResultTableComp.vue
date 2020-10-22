<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          Position
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
        <td>{{ item.position | position }}</td>
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
}
</script>

<style scoped>

</style>
