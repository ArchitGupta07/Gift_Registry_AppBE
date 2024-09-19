import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GiftsService {
  constructor(private readonly databaseService: DatabaseService) {

    async create(createGiftDto: Prisma.EmployeeCreateInput) {
        return this.databaseService.employee.create({
          data:createEmployeeDto
        });
      }
    
      async findAll(role?:'INTERN'|'ENGINEER'|'ADMIN') {
        if (role) return this.databaseService.employee.findMany({
          where:{
            role,
          }
        });
    
        return this.databaseService.employee.findMany()
      }
    
      async findOne(id: number) {
        return this.databaseService.employee.findUnique({
          where:{
            id,
          }
        });
      }
    
      async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
        return this.databaseService.employee.update({
          where:{
            id
          },
          data:updateEmployeeDto
        })
      }
    
      async remove(id: number) {
        return this.databaseService.employee.delete({
          where:{
            id,
          }
        });
      }
  }
}
