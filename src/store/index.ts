import Vue from 'vue';
import Vuex from 'vuex';
import { RaceResultItemDto, SeasonDto } from '@/types/Season';

function isPodest(item: RaceResultItemDto) {
  return item.position === 1 || item.position === 2 || item.position === 3;
}

Vue.use(Vuex);

export interface ModuleState {
  seasons: SeasonDto[];
}

export default new Vuex.Store<ModuleState>({
  state: {
    seasons: [],
  },
  mutations: {
    SetSeasons(state, seasons) {
      state.seasons = Object.keys(seasons).map((x) => {
        const item = seasons[x];
        const key = x;
        return {
          key,
          ...item,
        };
      });
    },
  },
  getters: {
    getSeason: (state) => (id: string) => state.seasons.find((x) => x.id === id) as SeasonDto,

    getComulated: (state) => (id: string) => {
      const season = state.seasons.find((x) => x.id === id) as SeasonDto;
      if (!season?.races) { return []; }
      const seasonItems = Object.values(season.races)
        .filter((x) => !!x.items).flatMap((x) => x.items);
      const groupedByName = seasonItems.reduce((r: any, a) => {
        // eslint-disable-next-line
        r[a.racer] = [...r[a.racer] || [], a.points];
        return r;
      }, {});
      const pointsByRacer = Object.keys(groupedByName).map((x) => {
        const points = groupedByName[x].reduce((r: any, a: number) => r + a);
        return {
          racer: x,
          points,
        };
      });
      return pointsByRacer.sort((a, b) => b.points - a.points).map((x, index) => ({
        racer: x.racer,
        points: x.points,
        position: index + 1,
      }));
    },

    getRacerStats: (state) => (id: string) => {
      const season = state.seasons.find((x) => x.id === id) as SeasonDto;
      if (!season?.races) { return []; }
      const seasonItems = Object.values(season.races)
        .filter((x) => !!x.items).flatMap((x) => x.items);
      const groupedByName = seasonItems.reduce((r: any, a) => {
        // eslint-disable-next-line
        r[a.racer] = [...r[a.racer] || [], a];
        return r;
      }, {});
      return Object.keys(groupedByName).map((x) => {
        const wins = groupedByName[x]
          .filter((item: RaceResultItemDto) => item.position === 1).length;
        const podests = groupedByName[x]
          .filter((item: RaceResultItemDto) => isPodest(item)).length;
        const dnf = groupedByName[x]
          .filter((item: RaceResultItemDto) => item.position === 0).length;
        return {
          racer: x,
          wins,
          podests,
          dnf,
        };
      }).sort((a, b) => b.wins - a.wins);
    },
  },
  actions: {},
  modules: {},
});
