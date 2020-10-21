<template>
  <div class="container">
    <race-result :result="firstResult"></race-result>
    <race-result :result="secondResult"></race-result>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import RaceResult from "@/components/RaceResult.vue";
import { RaceDto } from "@/types/Season";

@Component({
  components: {
    RaceResult
  }
})
export default class Season extends Vue {

  get firstResult(): RaceDto {
    return this.$store.state.seasons[0]?.races[0];
  }

  get secondResult(): RaceDto {
    return this.$store.state.seasons[0]?.races[1];
  }

}

</script>

<style scoped>

</style>
