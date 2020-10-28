export interface SeasonDto {
    id: string;
    name: string;
    start: string;
    end: string;
    plannedRaces: number;
    races: RacesDto;
}

export interface SeasonsDto {
    [key: string]: SeasonDto;
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
    items: RaceResultItemDto[];
}

export interface RaceResultItemDto {
    racer: string;
    position: number;
    points: number;
}
