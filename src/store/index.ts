import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    seasons: []
  },
  mutations: {
    SetSeasons(state, seasons) {
      state.seasons = seasons;
    }
  },
  actions: {},
  modules: {}
});
