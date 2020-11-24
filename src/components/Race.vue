<template>
  <div>
    <div class="subtitle-1">
      <span>Rennen</span>
      <result-dialog
        :season-id="$route.params.id"
        :race="race"
      />
    </div>

    <v-sheet
      class="mx-auto transition-swing rounded-lg"
      elevation="4"
      width="100%"
    >
      <v-container
        class="mt-2"
        v-if="!!race.results"
      >
        <result-table
          :results="race.results"
          :qualifying="race.qualifying"
        />
      </v-container>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RaceDto } from '@/types/Season';
import ResultTable from '@/components/ResultTable.vue';
import ResultDialog from '@/components/dialogs/ResultDialog.vue';

@Component({
  components: {
    ResultTable,
    ResultDialog,
  },
})
export default class RaceComp extends Vue {
  @Prop()
  race!: RaceDto;
}
</script>

<style scoped>

</style>
