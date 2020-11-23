export interface RacerStat {
    racer: string;
    points: number;
    wins: number;
    podests: number;
    dnf: number;
}

export interface Stats {
  seasons: number;
  races: number;
  racers: string [];
  racerStats: RacerStat [];
}
