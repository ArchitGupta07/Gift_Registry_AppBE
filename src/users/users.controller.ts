import { Controller, Get, Param, NotFoundException, Delete, ParseIntPipe, BadRequestException, UnauthorizedException,Patch, Body, Post, Version, Res, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import {UpdateUserDto} from './users.dto';
import { CreateUserDto } from './dto/CreateUserDto';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { UserLoginDto } from './dto/UserLoginDto';
import { CreateAddressDto } from './dto/CreateAddressDto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}




  @Post("signup")
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


  @Post('login')
  @Version("1")
  @ApiOperation({ summary: 'Retrieve all users excluding a specific user' })
@ApiResponse({ 
  status: 200, 
  description: 'A successful response that returns a list of users excluding the specified user.' 
})
@ApiResponse({ 
  status: 404, 
  description: 'No users found.' 
})
@ApiBody({ type: UserLoginDto })

  async login(@Body() body: any, @Res() res: Response) {
    const { email, password } = body;

    console.log(email)

    try {
      const user = await this.userService.getUserByEmail(email);
      console.log(user)
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
  
      // const { password: _, ...userData } = user; 
      const {...userData} = user
      return res.status(HttpStatus.OK).json(userData);
    } catch (error) {
      
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred' });
    }
  }

  @Get('all')
  @Version('1')
  @ApiOperation({ summary: 'Get all users excluding the specified user' })
  @ApiResponse({ status: 200, description: 'Returns a list of users excluding the specified user' })
  @ApiQuery({ name: 'userId', required: false, description: 'The ID of the user to exclude' })
  async fetchUsers(@Res() res: Response, @Query('userId') userId?: number ) {
    try {
      console.log("fetchUsers api hit")
      let users;
      if (userId) {
        users = await this.userService.findAllExcluding(userId);
      } else {
        users = await this.userService.findAll(); 
      }console.log(users)
      return res.status(200).json(users); 
    } catch (error) {
      
      console.error('Failed to fetch users:', error);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }



  @Get(':id')
  @Version('1')
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
  @Version('1')
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
  @Version('1')
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
  @Version('1')
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




  // UserAdress===================================================================

  @Post("/address/")
  @Version('1')
  @ApiOperation({ summary: 'Create user address' })
  @ApiBody({ type: CreateAddressDto })
  async createAddress(@Body() createAddressDto: CreateAddressDto, @Res() res: Response) {
    try {
        const address = await this.userService.createAddress(createAddressDto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Address created successfully',
            data: address,
        });
    } catch (error) {
        console.error('Error creating address:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to create address',
            error: error.message,
        });
    }
}
@Get('/address/:userId')
@Version('1')
@ApiOperation({ summary: 'Get user address by userID' })
@ApiParam({ name: 'userId', type: Number, description: 'ID of the user whose address is to be fetched' })
@ApiResponse({ status: HttpStatus.OK, description: 'Address fetched successfully' })
@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Address not found' })
async getUserAddress(@Param('userId') userId: number, @Res() res: Response) {
  try {
    const address = await this.userService.getUserAddress(userId);

    if (!address || address.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Address for user with ID ${userId} not found`,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Address fetched successfully',
      data: address,
    });
  } catch (error) {
    console.error('Error fetching address:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to fetch address',
      error: error.message,
    });
  }
}


}
