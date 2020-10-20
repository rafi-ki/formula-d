<template>
  <div class="home">
    <div class="container">
      <race-result></race-result>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RaceResult from "@/components/RaceResult.vue";

@Component({
  components: {
    RaceResult
  }
})
export default class Home extends Vue {


}
</script>
