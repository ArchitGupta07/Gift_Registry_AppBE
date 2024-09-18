import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';

@Module({
  imports: [UsersModule, GiftsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
