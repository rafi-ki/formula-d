<template>
  <v-card v-if="!!season"
      class="mx-auto mt-2"
      max-width="344"
      outlined
      @click="move"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div v-if="commulated.length > 0" class="overline mb-4">
          Podest: {{ Podest }}
        </div>
        <v-list-item-title class="headline mb-1">
          {{  season.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ season.start }} - {{ season.end }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RaceResultItemDto, SeasonDto } from "@/types/Season";

@Component
export default class SeasonCard extends Vue {

  @Prop()
  season!: SeasonDto;

  move() {
    const path = 'season/' + this.season.id;
    this.$router.push({ path })
  }

  get commulated(): RaceResultItemDto[] {
    return this.$store.getters.getComulated(this.season.id);
  }

  get Podest(): string {
    const commulated = this.commulated;
    let podest = "";
    if (commulated.length > 0)
      podest = podest.concat("1." + commulated[0].racer);
    if (commulated.length > 1)
      podest = podest.concat(" 2." + commulated[1].racer);
    if (commulated.length > 2)
      podest = podest.concat(" 3. " + commulated[2].racer);
    return podest;
  }
}
</script>

<style scoped>

</style>
