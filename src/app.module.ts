import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { RegistriesModule } from './registries/registries.module';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { GatewayModule } from './gateway/gateway.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    GatewayModule,
    // GiftsModule,
    
    forwardRef(() => DatabaseModule),
    forwardRef(() => GiftsModule),
    forwardRef(() => EventsModule), 
    forwardRef(() => RegistriesModule),
    forwardRef(() => GroupsModule),
    ChatModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService,DatabaseService],
})
export class AppModule {}
