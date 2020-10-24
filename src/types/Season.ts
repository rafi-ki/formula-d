export interface SeasonDto {
    id: string,
    name: string,
    start: string,
    end: string,
    plannedRaces: number,
    races: RaceDto[]
}

export interface RaceDto {
    name: string,
    track: string,
    order: number,
    qualifying?: string[],
    items: RaceResultItemDto[]
}

export interface RaceResultItemDto {
    racer: string,
    position: number,
    points: number
}
