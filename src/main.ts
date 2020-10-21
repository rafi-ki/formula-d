import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";
import "firebase/database";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBSfeVkcrfyOoysm2giGrH87NYTj7HYSrI",
  authDomain: "formula-d-f86d2.firebaseapp.com",
  databaseURL: "https://formula-d-f86d2.firebaseio.com",
  projectId: "formula-d-f86d2",
  storageBucket: "formula-d-f86d2.appspot.com",
  messagingSenderId: "967499056906",
  appId: "1:967499056906:web:9a562127e93c526fa39cf3"
};

firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
