<template>
  <div v-if="!!result">
    <div class="text-h4"> {{ result.name }}</div>
    <div class="text-subtitle-1"> {{ result.track }}</div>
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
              v-for="item in result.items"
              :key="item.racer"
          >
            <td>{{ item.position }}</td>
            <td>{{ item.racer }}</td>
            <td>{{ item.points }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RaceResultDto } from "@/types/Season";
import data from "@/data/formulad.json";

@Component({
  components: {
  }
})
export default class RaceResult extends Vue {

  // @Prop()
  result: RaceResultDto | null = null

  mounted() {
    this.result = data["Season 1"][0];
    // console.log(this.result);
  }
}
</script>

<style scoped>

</style>
