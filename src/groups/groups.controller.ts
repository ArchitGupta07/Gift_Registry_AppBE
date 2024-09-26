import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupRelationDto } from './groups.dto';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {


constructor(private readonly groupsService : GroupsService){}

@Post()
@ApiResponse({ status: 201, description: 'Group created successfully.' })
@ApiBadRequestResponse({
    status: 400,
    description: 'Invalid input, validation failed.',
})
async create(@Body() createGroupRelationDto: CreateGroupRelationDto) {
    const groupId = await this.groupsService.createGroup(createGroupRelationDto.createGroupDto, createGroupRelationDto.userId);
    
    if (groupId === -1) {
        throw new HttpException({
            message: "Group creation unsuccessful",
            data: groupId
        }, HttpStatus.BAD_REQUEST);
    }

    return {
        statusCode: HttpStatus.CREATED,
        message: "Group created successfully",
        data: groupId
    };
}

@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
    const response = await this.groupsService.getGroupData(id);
    
    if (response) {
        return {
            message: "Success",
            data: response
        }; 
    }

    throw new HttpException({
        message: "Group not found",
        data: null
    }, HttpStatus.NOT_FOUND);
}   
}


// delete and update