import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAddressDto } from './dto/CreateAddressDto';


@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}


  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        password: `dummy-google-id-${uuidv4()}@example.com`,
        
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
      where: {
        id:userId
        
      },
      select: {
        id: true,
        username: true,
        email: true,
        profilePic: true,
      },
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
      select: {
        id: true,
        username: true,
        email: true,
        profilePic: true,
      },
    });

    if (!user) {
      console.log("user not found")
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


async createAddress(createAddressDto: CreateAddressDto) {
  const { userId, addressLine1, addressLine2, landmark, pincode, city, country } = createAddressDto;

  const address = await this.databaseService.userAddress.create({
      data: {
          userId,
          addressLine1,
          addressLine2,
          landmark,
          pincode,
          city,
          country,
      },
  });

  return address;
}

async getUserAddress(userId: number){
  const address = await this.databaseService.userAddress.findMany({
    where: {
      userId: userId,
    },
  });

  if(address.length===0){
    throw new Error(`Address for user with ID ${userId} not found`);
  }
return address;
}



async assignUserToGroup(userId: number, groupId: number,role: 'OWNER' | 'MEMBER') {
  
  return this.databaseService.userGroup.create({
    data: {
      userId: userId,
      groupId: groupId,
      role: role,
    },
  });
}

}