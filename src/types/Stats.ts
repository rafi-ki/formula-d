export interface RacerStat {
    racer: string;
    points: number;
    wins: number;
    podests: number;
    poles: number;
    dnf: number;
    titels: number;
}

export interface Stats {
  seasons: number;
  races: number;
  racers: string [];
  racerStats: RacerStat [];
}
