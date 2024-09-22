import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RegistriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRegistryDto: Prisma.RegistryCreateInput) {
    return this.databaseService.registry.create({
      data: createRegistryDto,
    });
  }

  async findAll(eventId: number) {
    if (eventId)
      return this.databaseService.registry.findMany({
        where: {
          eventId,
        },
      });

    return this.databaseService.registry.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.registry.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRegistryDto: Prisma.RegistryUpdateInput) {
    return this.databaseService.registry.update({
      where: {
        id,
      },
      data: updateRegistryDto,
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