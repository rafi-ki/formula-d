<template>
  <div class="home">
    <v-container>
      <season-card
        v-for="season in seasons"
        :key="season.name"
        :season="season"
      />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SeasonCard from '@/components/SeasonCard.vue';
import { SeasonDto } from '@/types/Season';

@Component({
  components: {
    SeasonCard,
  },
})
export default class Home extends Vue {
  get seasons(): SeasonDto[] {
    return this.$store.state.seasons;
  }
}
</script>
