import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString, IsNumber, IsArray, IsOptional, IsDateString } from 'class-validator';

export class CreateGroupRelationDto{

    // createGroupDto : Prisma.GroupCreateInput;
    @ApiProperty()
    @IsNumber()
    groupOwnerId: number;

    @ApiProperty()
    @IsString()
    groupName: string;


    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsArray()
    @IsOptional() 
    @IsNumber({}, { each: true })
    memberIds? : number[];
}

export class UpdateGroupDto {
    @ApiProperty()
    @IsString()
    groupName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        type: [Number],
    })
    @IsArray()
    @IsNumber({}, { each: true })
    memberIds: number[];
}