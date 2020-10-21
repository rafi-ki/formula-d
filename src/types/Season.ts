export interface SeasonDto {
    id: string,
    name: string,
    plannedRaces: number,
    races: RaceDto[]
}

export interface RaceDto {
    name: string,
    track: string,
    order: number,
    items: RaceResultItemDto[]
}

export interface RaceResultItemDto {
    racer: string,
    position: number,
    points: number
}
