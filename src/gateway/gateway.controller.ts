import { Controller, Get, HttpStatus, Param, ParseIntPipe, Res, Version } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';


@ApiTags('comments')
@Controller('gateway')
export class GatewayController {


constructor(private readonly gatewayService: GatewayService) {}


  @Get('event-comment/:eventId')
  @Version('1')
  @ApiOperation({ summary: 'Retrieve all comments for a specific Event' })
  @ApiParam({ name: 'eventId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Comments retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Failed to retrieve Comments.' })
  async getEventComments(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Res() res: Response,
  ) {
    try {
      const comments = await this.gatewayService.findAll(eventId);
    //   console.log("previous comments.......................")
    //   console.log(comments)
      return res.status(HttpStatus.OK).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to retrieve Comments',
        error: error.message,
      });
    }
  }
}