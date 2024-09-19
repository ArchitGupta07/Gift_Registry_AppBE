import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { Prisma } from '@prisma/client';
import { RegistriesService } from './registries.service';

@Controller('registries')
export class RegistriesController {
  constructor(private readonly registriesService: RegistriesService) {}

  @Post()
  create(@Body() createRegistryDto: Prisma.RegistryCreateInput) {
    return this.registriesService.create(createRegistryDto);
  }

  @SkipThrottle({ default: false })
  @Get('eventRegistry/:id')
  findAll(@Param('id', ParseIntPipe) id: number) {
    return this.registriesService.findAll(id);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.registriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegistryDto: Prisma.RegistryUpdateInput,
  ) {
    return this.registriesService.update(id, updateRegistryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.registriesService.remove(id);
  }
}
