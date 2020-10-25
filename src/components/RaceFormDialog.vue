<template>
  <v-dialog
      v-model="dialog"
      max-width="290"
      @click:outside="closeDialog"
  >
    <v-card>
      <v-card-title class="headline">
        Kommt hier was zum Eingeben?
      </v-card-title>
      <v-card-text>
        Frag ich dich!
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="success"
            @click="closeDialog"
        >
          Noch nicht
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
})
export default class RaceFormDialog extends Vue {
  @Prop()
  dialog = false;

  @Emit()
  closeDialog() {
    // empty on purpose
  }
}
</script>

<style scoped>

</style>
