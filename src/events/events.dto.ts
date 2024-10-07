import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '@prisma/client';
import { IsArray, IsNumber, IsString, IsNotEmpty, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    eventName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    eventType?: EventType;

    @ApiProperty()
    @IsString()
    @IsOptional()
    venue?: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    groupId: number;

    // @ApiProperty({
    //     type: [Number],
    //     default: [],
    // })
    // @IsArray()
    // @IsOptional()
    // @IsNumber({}, { each: true })
    // organizers: number[] = [];

    // @ApiProperty({
    //     type: [Number],
    //     default: [],
    // })
    // @IsArray()
    // @IsOptional()
    // @IsNumber({}, { each: true })
    // members: number[] = [];
}

export class UpdateEventDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    eventName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        type: [Number]
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    organizers?: number[];

    @ApiProperty({
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    members?: number[];
}
