export interface RaceResultDto {
    name: string,
    track: string,
    items: RaceResultItemDto[]
}

export interface RaceResultItemDto {
    racer: string,
    position: number,
    points: number
}
