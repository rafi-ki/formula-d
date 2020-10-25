<template>
  <v-container>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Rennfahrer
          </th>
          <th class="text-left">
            Siege
          </th>
          <th class="text-left">
            Podestplätze
          </th>
          <th class="text-left">
            DNF
          </th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Racers extends Vue {


}
</script>

<style scoped>

</style>
