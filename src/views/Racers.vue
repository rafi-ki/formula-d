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
        <tr
            v-for="item in racerStats()"
            :key="item.racer"
        >
          <td>{{ item.racer }} </td>
          <td>{{ item.wins }}</td>
          <td>{{ item.podests }}</td>
          <td>{{ item.dnf }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Racers extends Vue {

  racerStats() {
    return this.$store.getters.getRacerStats("266441B9-9F08-4A1C-A04B-C1B6691C8519");
  }
}
</script>

<style scoped>

</style>
