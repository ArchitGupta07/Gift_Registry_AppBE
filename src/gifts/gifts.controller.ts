import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GiftsService } from './gifts.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('gifts')
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Post()
  async create(
    @Body() createGiftDto: Prisma.GiftCreateInput,
    @Res() res: Response,
  ) {
    try {
      const gift = await this.giftsService.create(createGiftDto);
      return res.status(HttpStatus.CREATED).json(gift);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create gift',
        error: error.message,
      });
    }
  }

  @Get('giftList/:registryId')
  async findAll(
    @Param('registryId', ParseIntPipe) registryId: number,
    @Res() res: Response,
  ) {
    try {
      const gifts = await this.giftsService.findAll(registryId);
      return res.status(HttpStatus.OK).json(gifts);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to retrieve gifts',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const gift = await this.giftsService.findOne(id);
      if (!gift) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Gift not found' });
      }
      return res.status(HttpStatus.OK).json(gift);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to retrieve gift',
        error: error.message,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGiftDto: Prisma.GiftUpdateInput,
    @Res() res: Response,
  ) {
    try {
      const updatedGift = await this.giftsService.update(id, updateGiftDto);
      if (!updatedGift) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Gift not found' });
      }
      return res.status(HttpStatus.OK).json(updatedGift);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to update gift',
        error: error.message,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const deleted = await this.giftsService.remove(id);
      if (!deleted) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Gift not found' });
      }
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to delete gift',
        error: error.message,
      });
    }
  }
}
