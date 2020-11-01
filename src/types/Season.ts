export interface SeasonDto {
    id: string;
    name: string;
    start: Date;
    end: Date;
    plannedRaces: number;
    races: RacesDto;
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
