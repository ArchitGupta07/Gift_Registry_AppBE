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
  Version,
} from '@nestjs/common';
import { Response } from 'express';
import { GiftsService } from './gifts.service';
import { Prisma } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGiftDto } from './dto/createGiftDto';
import { UpdateGiftDto } from './dto/updateGiftDto';

@ApiTags('gifts')
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create a new gift' })
  @ApiBody({ type: CreateGiftDto })
  @ApiResponse({ status: 201, description: 'Gift successfully created.' })
  @ApiResponse({ status: 500, description: 'Failed to create gift.' })
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
  @Version('1')
  @ApiOperation({ summary: 'Retrieve all gifts for a specific registry' })
  @ApiParam({ name: 'registryId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Gift list retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Failed to retrieve gifts.' })
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
  @Version('1')
  @ApiOperation({ summary: 'Retrieve a single gift by its ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Gift retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Gift not found.' })
  @ApiResponse({ status: 500, description: 'Failed to retrieve gift.' })
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
  @Version('1')
  @ApiOperation({ summary: 'Update a gift by its ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateGiftDto })
  @ApiResponse({ status: 200, description: 'Gift updated successfully.' })
  @ApiResponse({ status: 404, description: 'Gift not found.' })
  @ApiResponse({ status: 500, description: 'Failed to update gift.' })
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
  @Version('1')
  @ApiOperation({ summary: 'Delete a gift by its ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Gift deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Gift not found.' })
  @ApiResponse({ status: 500, description: 'Failed to delete gift.' })
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
