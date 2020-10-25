import Vue from "vue";
import Vuex from "vuex";
import { SeasonDto } from "@/types/Season";

Vue.use(Vuex);

export interface ModuleState {
  seasons: SeasonDto[]
}

export default new Vuex.Store<ModuleState>({
  state: {
    seasons: []
  },
  mutations: {
    SetSeasons(state, seasons) {
      state.seasons = seasons;
    }
  },
  getters: {
    getComulated: (state) => (id: string) => {
      const season = state.seasons[id as any] as SeasonDto;
      if (!season?.races)
        return [];
      const seasonItems = season.races.flatMap(x => x.items);
      const groupedByName = seasonItems.reduce((r: any, a) => {
        r[a.racer] = [...r[a.racer] || [], a.points];
        return r;
      }, {});
      const pointsByRacer = Object.keys(groupedByName).map(x => {
        const points = groupedByName[x].reduce((r: any, a: number) => { return r+a; });
        return {
          racer: x,
          points: points
        }
      });
      return pointsByRacer.sort((a, b) => b.points - a.points).map((x, index) => {
        return {
          racer: x.racer,
          points: x.points,
          position: index+1
        }
      });
    },

    getRacerStats: (state) => {
      return [];
    }
  },
  actions: {},
  modules: {}
});
