export interface SeasonDto {
    name: string,
    races: RaceDto[]
}

export interface RaceDto {
    name: string,
    track: string,
    items: RaceResultItemDto[]
}

export interface RaceResultItemDto {
    racer: string,
    position: number,
    points: number
}
