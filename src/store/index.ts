import Vue from 'vue';
import Vuex from 'vuex';
import { RaceDto, RacerResultDto, SeasonDto } from '@/types/Season';

function isPodest(item: RacerResultDto) {
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
        if (!item.races) {
          item.start = new Date();
          item.end = new Date();
        } else {
          const races = Object.values(item.races) as RaceDto[];
          const firstRace = races.sort((a, b) => a.order - b.order)[0];
          item.start = new Date(firstRace.date);
          const lastRace = races.sort((a, b) => b.order - a.order)[0];
          item.end = new Date(lastRace.date);
        }
        return {
          key,
          ...item,
        };
      }).sort((a, b) => b.start - a.start);
    },
  },
  getters: {
    getSeason: (state) => (id: string) => state.seasons.find((x) => x.id === id) as SeasonDto,

    getComulated: (state) => (id: string) => {
      const season = state.seasons.find((x) => x.id === id) as SeasonDto;
      if (!season?.races) { return []; }
      const seasonItems = Object.values(season.races)
        .filter((x) => !!x.results).flatMap((x) => x.results);
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
        .filter((x) => !!x.results).flatMap((x) => x.results);
      const groupedByName = seasonItems.reduce((r: any, a) => {
        // eslint-disable-next-line
        r[a.racer] = [...r[a.racer] || [], a];
        return r;
      }, {});
      return Object.keys(groupedByName).map((x) => {
        const wins = groupedByName[x]
          .filter((item: RacerResultDto) => item.position === 1).length;
        const podests = groupedByName[x]
          .filter((item: RacerResultDto) => isPodest(item)).length;
        const dnf = groupedByName[x]
          .filter((item: RacerResultDto) => item.position === 0).length;
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
