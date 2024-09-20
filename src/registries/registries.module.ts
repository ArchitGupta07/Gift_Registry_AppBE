import { Module } from '@nestjs/common';
import { RegistriesController } from './registries.controller';
import { RegistriesService } from './registries.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RegistriesController],
  providers: [RegistriesService]
})
export class RegistriesModule {}
