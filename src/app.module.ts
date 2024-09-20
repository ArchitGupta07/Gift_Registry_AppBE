import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './Auth/auth.module';
import { EventsModule } from './events/events.module';
import { RegistriesModule } from './registries/registries.module';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    GiftsModule,
    DatabaseModule,
    EventsModule,
    RegistriesModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
