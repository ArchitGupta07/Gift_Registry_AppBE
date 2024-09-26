import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('gifts')
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Post()
  create(@Body() createGiftDto: Prisma.GiftCreateInput) {
    return this.giftsService.create(createGiftDto);
  }

  @SkipThrottle({ default: false }) // this will make skilthrottle to not work for this particular api
  @Get('registry/:registryId')
  findAll(@Param('registryId', ParseIntPipe) registryId: number) {
    return this.giftsService.findAll(registryId);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } }) // this will help you a diifrenet type of throttle compared to what you defined in app.modules
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.giftsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: Prisma.GiftUpdateInput,
  ) {
    return this.giftsService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.giftsService.remove(+id);
  }
}
