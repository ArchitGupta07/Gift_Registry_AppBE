import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Res, Version } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateCommentDto } from './dtos/createCommentDto';
import { ChatService } from './chat.service';

@ApiTags('gifts')
@Controller('chat')
export class ChatController {

  constructor(private readonly chatService: ChatService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create a new gift' })
  @ApiBody({ type: CreateCommentDto})
  @ApiResponse({ status: 201, description: 'Gift successfully created.' })
  @ApiResponse({ status: 500, description: 'Failed to create gift.' })
  async create(
    @Body() createGiftDto: Prisma.GiftCreateInput,
    @Res() res: Response,
  ) {
    // try {
    //   const gift = await this.giftsService.create(createGiftDto);
    //   return res.status(HttpStatus.CREATED).json(gift);
    // } catch (error) {
    //   console.error(error);
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //     message: 'Failed to create gift',
    //     error: error.message,
    //   });
    // }
  }

  @Get('gift-list/:registryId')
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
    // try {
    //   const gifts = await this.giftsService.findAll(registryId);
    //   return res.status(HttpStatus.OK).json(gifts);
    // } catch (error) {
    //   console.error(error);
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //     message: 'Failed to retrieve gifts',
    //     error: error.message,
    //   });
    // }
  }
}