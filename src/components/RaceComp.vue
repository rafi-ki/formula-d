<template>
  <div>
    <div class="subtitle-1">Rennen</div>
    <v-sheet
        class="mx-auto transition-swing rounded-lg"
        elevation="4"
        width="100%"
    >
      <v-container class="mt-2" v-if="!!race">
        <result-table-comp :items="race.items" :qualifying="race.qualifying"></result-table-comp>
      </v-container>
    </v-sheet>
  </div>

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
  race!: RaceDto;
}
</script>

<style scoped>

</style>
