import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, GiftsModule, DatabaseModule,EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
