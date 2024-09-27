import { Controller, Get, Param, NotFoundException, Delete, ParseIntPipe, BadRequestException, Patch, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Returns the user details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id: number) {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ID provided.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid user ID');
      }
      throw new Error('Internal server error');
    }
  }


  @ApiOperation({ summary: 'Update user details by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User ID', type: Number })
  @ApiBody({
    description: 'Data to update user with',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'Abhishek ' },
        email: { type: 'string', example: 'Abhishekxyz@example.com' },
        
      },
      required: ['username', 'email'], 
    },
  })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid update data or user ID provided.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: any
  ) {
    try {
      return await this.userService.updateUser(id, updateData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid update data or user ID');
      }
      throw new Error('Internal server error');
    }
  }

}
