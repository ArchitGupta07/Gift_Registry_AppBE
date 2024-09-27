import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule,UserModule],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule {}
