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

    @ApiProperty({
        type: [Number],
        default: [],
    })
    @IsArray()
    @IsOptional() 
    @IsNumber({}, { each: true })
    memberIds? : number[];
}



export class UpdateGroupDto {
  
    // @IsOptional()
    // @IsNumber()
    // @ApiProperty({ description: 'The ID of the group to update', required: false })
    // groupId?: number;
    
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'The new name of the group', required: false })
    groupName?: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'The new description of the group', required: false })
    description?: string;
    
    @IsOptional()
    @IsArray()
    @ApiProperty({ description: 'The new members added to the group', required: false, type: [Number] })
    newMembers?: number[];
    
    @IsOptional()
    @IsArray()
    @ApiProperty({ description: 'The old members to be removed from the group', required: false, type: [Number] })
    removedMembers?: number[];
  }