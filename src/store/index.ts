import Vue from 'vue';
import Vuex from 'vuex';
import {
  FactorLuck,
  RaceDto, RacerResultDto, Season, SeasonDto,
} from '@/types/Season';
import { Stats } from '@/types/Stats';

function isPodest(item: RacerResultDto) {
  return item.position === 1 || item.position === 2 || item.position === 3;
}

function compareStart(a: Season, b: Season): number {
  if (a.start && b.start) {
    return a.start.getTime() - b.start.getTime();
  }
  return -1;
}

function mapFactorLuck(race: RaceDto): FactorLuck[] {
  if (!race.qualifying) { return []; }
  const racersCount = race.qualifying.length;
  return race.qualifying.map((y, i) => ({
    racer: y,
    factor: (racersCount / 2) + 0.5 - (i + 1),
  }));
}

Vue.use(Vuex);

export interface ModuleState {
  seasons: Season[];
}

export default new Vuex.Store<ModuleState>({
  state: {
    seasons: [],
  },
  mutations: {
    SetSeasons(state, seasons) {
      state.seasons = Object.keys(seasons).map((x) => {
        const item = seasons[x];
        const id = x;
        if (item.races) {
          const races = Object.values(item.races) as RaceDto[];
          const firstRace = races.sort((a, b) => a.order - b.order)[0];
          item.start = new Date(firstRace.date);
          if (races.length === item.plannedRaces) {
            const lastRace = races.sort((a, b) => b.order - a.order)[0];
            item.end = new Date(lastRace.date);
          }
        }
        return new Season({
          id,
          ...item,
        });
      }).sort((a, b) => {
        if (b.start && a.start) {
          return b.start.getTime() - a.start.getTime();
        }
        if (!b.start) {
          return Number.MAX_SAFE_INTEGER;
        }
        if (!a.start) {
          return Number.MIN_SAFE_INTEGER;
        }
        return 0;
      });
    },
  },
  getters: {
    getSeason: (state) => (id: string): Season => state.seasons.find((x) => x.id === id) as Season,

    getLatestSeasonWithRaces: (state): Season => {
      const seasonsWithRaces = state.seasons.filter((value) => value.races!!);
      const sortedSeasons = [...seasonsWithRaces].sort(compareStart);
      console.log(sortedSeasons);
      return sortedSeasons[sortedSeasons.length - 1] as Season;
    },

    getFactorLuck: (state, getters) => (seasonId: string) => {
      const season = getters.getSeason(seasonId) as Season;
      const races = Object.values(season.races)
        .filter((x) => x.order !== 1)
        .filter((x) => x.qualifying);
      const factorsLuck = races.flatMap(mapFactorLuck);
      const groupedByName = factorsLuck.reduce((r: any, a: FactorLuck) => {
        // eslint-disable-next-line
        r[a.racer] = [...r[a.racer] || [], a.factor];
        return r;
      }, []);
      const racers = Object.keys(groupedByName);
      return racers.map((racer: string) => {
        const factor = groupedByName[racer].reduce((a: number, b: number) => a + b, 0);
        return {
          racer,
          factor,
        };
      }) as FactorLuck[];
    },

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

    getRacerStats: (state) => {
      const { seasons } = state;
      const champions = seasons.map((x) => x.champion);
      const races = state.seasons.flatMap((x) => Object.values(x.races))
        .filter((x) => !!x.results);
      const results = races.flatMap((x) => x.results);
      const groupedByName = results.reduce((r: any, a) => {
        // eslint-disable-next-line
        r[a.racer] = [...r[a.racer] || [], a];
        return r;
      }, {});
      return {
        seasons: state.seasons.length,
        races: races.length,
        racers: Object.keys(groupedByName),
        racerStats: Object.keys(groupedByName).map((x) => {
          const wins = groupedByName[x]
            .filter((item: RacerResultDto) => item.position === 1).length;
          const podests = groupedByName[x]
            .filter((item: RacerResultDto) => isPodest(item)).length;
          const dnf = groupedByName[x]
            .filter((item: RacerResultDto) => item.position === 0).length;
          const points = groupedByName[x].map((y: RacerResultDto) => y.points)
            .reduce((a: number, b: number) => a + b, 0);
          return {
            racer: x,
            points,
            wins,
            podests,
            dnf,
            titels: champions.filter((y) => x === y).length,
          };
        }).sort((a, b) => b.wins - a.wins),
      } as Stats;
    },

    getRacerStatsForSeason: (state) => (id: string) => {
      const season = state.seasons.find((x) => x.id === id) as SeasonDto;
      if (!season?.races) { return null; }
      const races = Object.values(season.races).filter((x) => !!x.results);
      const seasonItems = races.filter((x) => !!x.results).flatMap((x) => x.results);
      const groupedByName = seasonItems.reduce((r: any, a) => {
        // eslint-disable-next-line
        r[a.racer] = [...r[a.racer] || [], a];
        return r;
      }, {});
      return {
        seasons: 1,
        races: races.length,
        racers: Object.keys(groupedByName),
        racerStats: Object.keys(groupedByName).map((x) => {
          const wins = groupedByName[x]
            .filter((item: RacerResultDto) => item.position === 1).length;
          const podests = groupedByName[x]
            .filter((item: RacerResultDto) => isPodest(item)).length;
          const dnf = groupedByName[x]
            .filter((item: RacerResultDto) => item.position === 0).length;
          const points = groupedByName[x].map((y: RacerResultDto) => y.points)
            .reduce((a: number, b: number) => a + b, 0);
          return {
            racer: x,
            points,
            wins,
            podests,
            dnf,
          };
        }).sort((a, b) => b.wins - a.wins),
      } as Stats;
    },
  },
  actions: {},
  modules: {},
});
