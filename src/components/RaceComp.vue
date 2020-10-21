<template>
  <v-sheet
      class="mx-auto transition-swing rounded-lg"
      elevation="4"
      width="100%"
  >
  <div class="container mt-2" v-if="!!result">
    <div class="text-h4"> {{ result.name }}</div>
    <div class="text-subtitle-1"> {{ result.track }}</div>
    <result-table-comp :items="result.items"></result-table-comp>
  </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RaceDto } from "@/types/Season";
import ResultTableComp from "@/components/ResultTableComp.vue";

@Component({
  components: {
    ResultTableComp
  }
})
export default class RaceComp extends Vue {
  @Prop()
  result!: RaceDto;
}
</script>

<style scoped>

</style>
