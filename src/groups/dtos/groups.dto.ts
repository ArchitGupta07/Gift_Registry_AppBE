import { Prisma } from '@prisma/client';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateGroupRelationDto {
    createGroupDto : Prisma.GroupCreateInput;
    
    @IsArray()
    @IsOptional() 
    @IsNumber({}, { each: true })
    userId? : number[]; 
}