import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}


  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        googleId: `dummy-google-id-${uuidv4()}@example.com`,
        
      },
    });
  }

  async findAll() {
    return this.databaseService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        profilePic: true,
      },
    });
  }

  async findAllExcluding(userId: number) {
    return this.databaseService.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        profilePic: true,
      },
    });
  }

  async getUserById(userId: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUsersByIds(userIds: number[]) {
    const users = await this.databaseService.user.findMany({
        where: {
            id: {
                in: userIds,
            },
        },
        select : {
          id :true,
          username : true,
          email : true
        }
    });

    // if (users.length === 0) {
    //     throw new NotFoundException('Users not found');
    // }

    return users.length > 0 ? users : [];
}

  async getUserByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  
  
  async deleteUser(userId: number) {
    const user = await this.getUserById(userId); 

    await this.databaseService.user.delete({
      where: { id: userId },
    });

    return { message: 'User successfully deleted' };
  }





  async updateUser(userId: number, updateData: any) {
    const user = await this.getUserById(userId); 

    if (!user) {
      throw new NotFoundException('User not found');
    }
    try{ 
    const updatedUser = await this.databaseService.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  }catch(error){
    console.error('Error during updateUser service call:', error);
    throw new Error('Failed to update user');
  }
  }
}
