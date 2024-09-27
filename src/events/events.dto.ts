import { IsArray, IsNumber, IsString, IsNotEmpty, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDto {
    @IsNumber()
    @IsNotEmpty() 
    userId: number;

    @IsString()
    @IsNotEmpty()
    eventName: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    organizers: number[];

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    members: number[];
}

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    eventName?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    organizers?: number[];

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    members?: number[];
}
