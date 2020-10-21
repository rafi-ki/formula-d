<template>
  <v-sheet
      class="mx-auto transition-swing rounded-lg"
      elevation="4"
      width="100%"
      max-width="50em"
  >
  <div class="container mt-2" v-if="!!result">
    <div class="text-h5">
      <span class="mr-2">{{ result.order }}</span><span class="font-italic">"{{ result.name }}"</span>
    </div>
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
