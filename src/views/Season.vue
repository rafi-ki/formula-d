<template>
  <v-container v-if="!!races">
    <season-result :season="season"></season-result>
    <v-divider class="mt-5 mb-5"></v-divider>
    <v-expansion-panels>
      <v-expansion-panel v-for="race in races" :key="race.order">
        <v-expansion-panel-header>
          <div class="text-h5">
            <span class="mr-2">{{ race.order }}</span><span class="font-italic">"{{ race.name }}"</span>
            <div class="text-subtitle-1"> {{ race.track }}</div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <race-comp  :result="race"></race-comp>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import RaceComp from "@/components/RaceComp.vue";
import { RaceDto, SeasonDto } from "@/types/Season";
import SeasonResult from "@/components/SeasonResult.vue";

@Component({
  components: {
    SeasonResult,
    RaceComp
  }
})
export default class Season extends Vue {

  get season(): SeasonDto {
    const id = this.$route.params.id;
    return this.$store.state.seasons.find((x: SeasonDto) => x.id == id);
  }

  get races(): RaceDto[] {
    if (this.season)
      return this.season.races.sort((a, b) => b.order - a.order);
    return [];
  }

}

</script>

<style scoped>

</style>
