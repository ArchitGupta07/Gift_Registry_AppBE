import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

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

    if (users.length === 0) {
        throw new NotFoundException('Users not found');
    }

    return users;
}



  async getUserByEmailorUserName(identifier: string) {
    const user = await this.databaseService.user.findFirst({
      where: { OR: [
        {email: identifier},
        {username:identifier}
      ] },
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



  async getAllUsers() {
    const users = await this.databaseService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return users;
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
