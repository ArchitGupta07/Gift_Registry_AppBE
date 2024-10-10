import { Module } from '@nestjs/common';
 import { MyGateway } from './gateway';
import { GatewayService } from './gateway.service';
import { DatabaseModule } from 'src/database/database.module';


@Module({
    imports: [DatabaseModule],
  providers: [MyGateway, GatewayService],
  })
export class GatewayModule{}

