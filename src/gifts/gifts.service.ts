import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GiftsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createGiftDto: Prisma.GiftCreateInput) {
    return this.databaseService.gift.create({
      data: createGiftDto,
    });
  }

  async findAll(registryId) {
    if (registryId)
      return this.databaseService.gift.findMany({
        where: {
          registryId,
        },
      });

    return this.databaseService.gift.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.gift.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.GiftUpdateInput) {
    return this.databaseService.gift.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.gift.delete({
      where: {
        id,
      },
    });
  }
}
