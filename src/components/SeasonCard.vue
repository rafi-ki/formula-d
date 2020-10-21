<template>
  <v-card v-if="!!season"
      class="mx-auto"
      max-width="344"
      outlined
      @click="move"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          Podest: 1. {{ commulated[0].racer }} | 2. {{ commulated[1].racer }} | 3. {{ commulated[2].racer }}
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

@Component({
  components: {
  }
})
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
}
</script>

<style scoped>

</style>
