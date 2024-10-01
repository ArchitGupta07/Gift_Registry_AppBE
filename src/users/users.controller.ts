import { Controller, Get, Param, NotFoundException, Delete, ParseIntPipe, BadRequestException, Patch, Body, Post, Version, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import {UpdateUserDto} from './users.dto';
import { CreateUserDto } from './dto/CreateUserDto';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}




  @Post("login")
  @Version('1')
  @ApiOperation({ summary: 'Create a new User' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 500, description: 'Failed to create user.' })
  async create(
    @Body() creatUserDto: Prisma.UserCreateInput,
    @Res() res: Response,
  ) {
    try {
      console.log(creatUserDto)
      const user = await this.userService.create(creatUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create gift',
        error: error.message,
      });
    }
  }

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



  @Get('email/:email')  
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, description: 'Returns the user details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserByEmail(@Param('email') email: string) {
    try {
      return await this.userService.getUserByEmail(email);
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
    type: UpdateUserDto,
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
    @Body() updateData: UpdateUserDto
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
