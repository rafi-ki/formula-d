<template>
  <div>
    <div class="subtitle-1">
      <span>Qualifying</span>
      <qualifying-dialog
        :season-id="$route.params.id"
        :race="race"
      />
    </div>
    <v-chip
      v-for="(racer, index) in qualifying"
      :key="index"
      class="ma-1"
      :color="index===0 ? 'success' : ''"
      outlined
    >
      <v-avatar
        left
      >
        {{ index + 1 }}.
      </v-avatar>
      {{ racer }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import QualifyingDialog from '@/components/dialogs/QualifyingDialog.vue';
import { RaceDto } from '@/types/Season';

@Component({
  components: {
    QualifyingDialog,
  },
})
export default class Qualifying extends Vue {
  @Prop()
  qualifying!: string[];

  @Prop()
  race!: RaceDto;

  isPodest(index: number): boolean {
    return index === 0 || index === 1 || index === 2;
  }
}
</script>

<style scoped>

</style>
