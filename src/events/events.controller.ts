import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
  Version,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './events.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Version('1')
  @ApiOperation({
    summary: 'Create a new event',
    description: 'Creates a new event with the provided details.',
  })
  @ApiBody({
    description: 'The data required to create a new event',
    type: CreateEventDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Event created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Event creation failed',
  })
  async createEvent(@Body() createEventDTO: CreateEventDto) {
      try {
          const event = await this.eventsService.createEvent(createEventDTO);

          return {
              message: 'Event created successfully',
              data: event,
          };
      } catch (error) {
          console.error('Error in createEvent controller:', error);
          throw new HttpException('Event creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @Get('user/:userId')
  @Version('1')
  @ApiOperation({
    summary: 'Get events for a user',
    description: 'Fetches all events associated with a specific user ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Events fetched successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'No events found for this user',
  })
  async getEvents(@Param('userId', ParseIntPipe) userId: number, @Res() res) {
    try {
        const events = await this.eventsService.getEvents(userId);
        console.log("user events api called", events)

        if (events.length > 0) {
            return res.status(HttpStatus.OK).json({
                message: 'Events fetched successfully',
                data: events,
            });
        }
        
        return res.status(HttpStatus.OK).json({
            message: 'No events found for this user',
            data: [],
        });
    } catch (error) {
        if (error instanceof HttpException) {
          throw error;
      }
        console.error('Error fetching events:', error);
        throw new HttpException('Failed to fetch events', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

  @Delete(':eventId')
  @Version('1')
  @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid input, validation failed.',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiOperation({ summary: 'Delete a event by event id' })
  async deleteEvent(@Param('eventId') eventId: number) {
    try {
      const response = await this.eventsService.deleteEvent(eventId);
      return {
        data: response,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An unexpected error occurred while deleting the group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':eventId')
  @Version('1')
  @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid input, validation failed.',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiOperation({ summary: 'Delete a event by event id' })
  async updateEvent(@Param('eventId') eventId: number,@Body() updateEventDto: UpdateEventDto) {
    try {
      const response = await this.eventsService.updateEvent(eventId,updateEventDto);
      return {
        data: response,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An unexpected error occurred while deleting the group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
