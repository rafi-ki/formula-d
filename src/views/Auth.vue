<template lang="html">
  <div>
    <div class="text-h1 text-center mt-5">
      Login
    </div>
    <div class="mt-5 text-subtitle-1 text-center">
      ... and race.
    </div>
    <div id="firebaseui-auth-container" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

@Component
export default class Auth extends Vue {
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
</script>

<style scoped>

</style>
