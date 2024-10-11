import { Module } from '@nestjs/common';
 import { MyGateway } from './gateway';
import { GatewayService } from './gateway.service';
import { DatabaseModule } from 'src/database/database.module';
import { GatewayController } from './gateway.controller';


@Module({
    imports: [DatabaseModule],
  providers: [MyGateway, GatewayService],
  controllers: [GatewayController],
  })
export class GatewayModule{}

