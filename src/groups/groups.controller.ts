import { Body, Controller, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Prisma } from '@prisma/client';
import { group } from 'console';
import { CreateGroupRelationDto } from './dtos/groups.dto';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService : GroupsService){}
    @Post()
    async create(@Body() createGroupRelationDto : CreateGroupRelationDto){
        const groupId = await this.groupsService.createGroup(createGroupRelationDto.createGroupDto,createGroupRelationDto.userId);
        if(groupId == -1)
        {
            return {
                message: "Group creation  unsuccessfully",
                data: groupId
            }; 
        }
        return {
            message: "Group created successfully",
            data: groupId
        };
    }
}
