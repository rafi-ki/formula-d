<template>
  <v-card v-if="!!season"
      class="mx-auto"
      max-width="344"
      outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          Podest: 1. Podo | 2. Markus | 3. Rafi
        </div>
        <v-list-item-title class="headline mb-1">
          {{  season.name }}
        </v-list-item-title>
        <v-list-item-subtitle>März 2020 - Oktober 2020</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SeasonDto } from "@/types/Season";

@Component({
  components: {
  }
})
export default class SeasonCard extends Vue {

  @Prop()
  season!: SeasonDto;

}
</script>

<style scoped>

</style>
