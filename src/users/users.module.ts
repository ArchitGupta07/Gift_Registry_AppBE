import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService], // Export UserService for use in other modules
})
export class UserModule {}
