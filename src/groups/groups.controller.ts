import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Version } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupRelationDto, UpdateGroupDto } from './groups.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {


constructor(private readonly groupsService : GroupsService){}

    @Post()
    @Version('1')
    @ApiResponse({ status: 201, description: 'Group created successfully.' })
    @ApiBadRequestResponse({status: 400,description: 'Invalid input, validation failed.'})
    @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error.' })
    @ApiOperation({ summary: 'create a new group' })
    async create(@Body() createGroupRelationDto: CreateGroupRelationDto) {
        try {
            const groupId = await this.groupsService.createGroup(createGroupRelationDto);
            return {
                message: "Group created successfully",
                data: groupId
        };
        } catch (error) {
            // we can create a generic function where we can pass the error and it will decide what kind of error code would be send to the user
            return new HttpException({
                message: error.message,
                data: error.type
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @Version('1')
    @ApiResponse({ status: 200, description: 'Group created successfully.' })
    @ApiBadRequestResponse({
        status: 400,
        description: 'Invalid input parameters, validation failed.',
    })
    @ApiResponse({ status: 404, description: 'group not found.' })
    @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error.' })
    @ApiOperation({ summary: 'get a group by group id' })
    async findGroupById(@Param('id', ParseIntPipe) id: number) {
        try {
            const response = await this.groupsService.getGroupById(id);
            console.log(response)
        
            if (response) {
                return {
                    message: "Success",
                    data: response
                }; 
            }
        } catch (error) {
             console.log(error)
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        
    }   

    @Get('user/:userId')
    @Version('1')
    @ApiResponse({ status: 200, description: 'Groups retrieved successfully.' })
    @ApiBadRequestResponse({status: 400,description: 'Invalid input, validation failed.'})
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiInternalServerErrorResponse({ status: 500, description: 'Internal server error.' })
    @ApiOperation({ summary: 'get all the groups for a user' })
    async getAllGroups(@Param('userId', ParseIntPipe) userId: number) {
        try {
            console.log("incoming req")
            const groups = await this.groupsService.getAllGroups(userId);
            if (groups.length === 0) {
                return {
                    message: 'No groups found for this user.',
                    data: groups,
                };
            }
    
            return {
                message: 'Success',
                data: groups,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':groupId')
    @Version('1')
    @ApiResponse({ status: 200, description: 'Group deleted successfully.' })
    @ApiBadRequestResponse({status: 400,description: 'Invalid input, validation failed.'})
    @ApiResponse({ status: 404, description: 'Group not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @ApiOperation({ summary: 'delete a group by group id' })
    async deleteGroup(@Param('groupId') groupId: number) {
        try {
            const response = await this.groupsService.deleteGroup(groupId);
            return {
                data : response
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('An unexpected error occurred while deleting the group', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':id')
    @Version('1')
    @ApiResponse({ status: 200, description: 'Group updated successfully.' })
    @ApiBadRequestResponse({status: 400,description: 'Invalid input, validation failed.'})
    @ApiResponse({ status: 404, description: 'Group not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @ApiOperation({ summary: 'update a group by group id' })
  async updateGroup(
    @Param('id') groupId: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    console.log('in service')
    console.log(groupId,updateGroupDto)
    try {
      const result = await this.groupsService.updateGroup(groupId, updateGroupDto);
        console.log("group updated successfully")
      return {
        message: 'Group updated successfully',
        data: result.data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(
        'An error occurred while updating the group',
      );
    }
  }
}



