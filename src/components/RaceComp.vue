<template>
  <v-sheet
      class="mx-auto transition-swing rounded-lg"
      elevation="4"
      width="100%"
      max-width="50em"
  >
    <v-container class="mt-2" v-if="!!result">

      <result-table-comp :items="result.items"></result-table-comp>
    </v-container>
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
