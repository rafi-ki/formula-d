<template>
  <div class="home">
    <div class="container">
      <season-card v-for="season in seasons" :key="season.name" :season="season">
      </season-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as firebase from "firebase/app";
import "firebase/database";
import SeasonCard from "@/components/SeasonCard.vue";
import { SeasonDto } from "@/types/Season";

@Component({
  components: {
    SeasonCard
  }
})
export default class Home extends Vue {



  get seasons(): SeasonDto[] {
    return this.$store.state.seasons;
  }


}
</script>
