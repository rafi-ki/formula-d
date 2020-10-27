import Vue from "vue";
import Vuex from "vuex";
import { RaceResultItemDto, SeasonDto } from "@/types/Season";

function isPodest(item: RaceResultItemDto) {
  return item.position === 1 || item.position === 2 || item.position === 3;
}

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
      const seasonItems = Object.values(season.races).filter(x => !!x.items).flatMap(x => x.items);
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

    getRacerStats: (state) => (id: string) => {
      const season = state.seasons[id as any] as SeasonDto;
      if (!season?.races)
        return [];
      const seasonItems = Object.values(season.races).filter(x => !!x.items).flatMap(x => x.items);
      const groupedByName = seasonItems.reduce((r: any, a) => {
        r[a.racer] = [...r[a.racer] || [], a];
        return r;
      }, {});
      return Object.keys(groupedByName).map(x => {
        const wins = groupedByName[x].filter((x: RaceResultItemDto) => x.position === 1).length;
        const podests = groupedByName[x].filter((x: RaceResultItemDto) => isPodest(x)).length;
        const dnf = groupedByName[x].filter((x: RaceResultItemDto) => x.position === 0).length;
        return {
          racer: x,
          wins,
          podests,
          dnf
        }
      }).sort((a, b) => b.wins-a.wins);
    },
  },
  actions: {},
  modules: {}
});

