export interface SeasonDto {
    id: string;
    name: string;
    start?: Date;
    end?: Date;
    plannedRaces: number;
    races: RacesDto;
    champion: string;
    duration(): string;
}

export class Season implements SeasonDto {
  end?: Date;

  id: string;

  name: string;

  plannedRaces: number;

  races: RacesDto;

  start?: Date;

  champion: string;

  constructor(s: SeasonDto) {
    this.id = s.id;
    this.name = s.name;
    this.plannedRaces = s.plannedRaces;
    this.races = s.races;
    this.end = s.end;
    this.start = s.start;
    this.champion = s.champion;
  }

  duration(): string {
    if (this.start && this.end) {
      return `${this.start.toLocaleDateString('de')} - ${this.end.toLocaleDateString('de')}`;
    }
    if (this.start) {
      return `Eröffnet am ${this.start.toLocaleDateString('de')}`;
    }
    return 'Noch nicht eröffnet';
  }

  isOver(): boolean {
    if (!this.races) {
      return false;
    }
    return Object.keys(this.races).length === this.plannedRaces;
  }
}

export interface RacesDto {
    [key: string]: RaceDto;
}

export interface RaceDto {
    id: string;
    name: string;
    track: string;
    order: number;
    date: string;
    qualifying?: string[];
    results: RacerResultDto[];
}

export interface RacerResultDto {
    racer: string;
    position: number;
    points: number;
}

export interface FactorLuck {
  racer: string;
  factor: number;
}

export interface Qualifier {
  racer: string;
  sum: number;
  dicedPosition: number;
  factorLuck: number;
  finished: boolean;
}
