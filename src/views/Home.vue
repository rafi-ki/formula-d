<template>
  <div class="home">
    <div class="container">
      <season-card v-for="season in seasons" :key="season.name" :season="season">
      </season-card>
      <race-result :result="firstResult"></race-result>
      <race-result :result="secondResult"></race-result>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RaceResult from "@/components/RaceResult.vue";
import * as firebase from "firebase/app";
import "firebase/database";
import { RaceDto, SeasonDto } from "@/types/Season";
import SeasonCard from "@/components/SeasonCard.vue";

@Component({
  components: {
    SeasonCard,
    RaceResult
  }
})
export default class Home extends Vue {

  mounted() {
    const seasonsRef = firebase.database().ref("seasons");
    seasonsRef.on("value", snapshot => {
      const seasons = snapshot.val() as SeasonDto[];
      this.$store.commit("SetSeasons", seasons);
    });
  }

  get seasons(): SeasonDto[] {
    return this.$store.state.seasons;
  }

  get firstResult(): RaceDto {
    return this.$store.state.seasons[0]?.races[0];
  }

  get secondResult(): RaceDto {
    return this.$store.state.seasons[0]?.races[1];
  }
}
</script>
