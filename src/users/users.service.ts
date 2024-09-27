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
