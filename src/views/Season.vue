<template>
  <div class="container" v-if="!!races">
    <season-result :season="season"></season-result>
    <race-comp v-for="race in races" :key="race.order" :result="race"></race-comp>
  </div>
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
