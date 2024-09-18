export interface CreateEventDto {
    userId : number
    eventName: string;
    description: string;
    organizers: number[];
    members: number[];
}