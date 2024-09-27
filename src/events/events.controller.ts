import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put, Version } from '@nestjs/common';
import {EventsService} from './events.service';
import { CreateEventDto } from './events.dto';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService:EventsService){}

    @Post()
    async createEvent(@Body() createEventDTO: CreateEventDto ){
            const event = await this.eventsService.createEvent(createEventDTO);

            if(event){
                return {
                    message: 'Event created Successfully',
                    data: event,
                };
            }

            return {
                message: 'Event creation failed',
                data: -1,
            };
    }

    @Get('/:userId')
    async getEvents(@Param('userId',ParseIntPipe) userId: number){
        const events = await this.eventsService.getEvents(userId);

        if(events.length>0){
            return {
                message : 'Events Fetched Successfully',
                data: events,
            };
        }
        return {
            message: 'no events found for  this user',
            data :[]
        }

    }

    @Delete(':eventId')
    @Version('1')
    @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
    @ApiBadRequestResponse({status: 400,description: 'Invalid input, validation failed.'})
    @ApiResponse({ status: 404, description: 'Event not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @ApiOperation({ summary: 'Delete a event by event id' })
    async deleteEvent(@Param('eventId') eventId: number) {
        try {
            const response = await this.eventsService.deleteEvent(eventId);
            return {
                data : response
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('An unexpected error occurred while deleting the group', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put(':eventId')
    @Version('1')
    @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
    @ApiBadRequestResponse({status: 400,description: 'Invalid input, validation failed.'})
    @ApiResponse({ status: 404, description: 'Event not found.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @ApiOperation({ summary: 'Delete a event by event id' })
    async updateEvent(@Param('eventId') eventId: number) {
        try {
            const response = await this.eventsService.updateEvent(eventId);
            return {
                data : response
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('An unexpected error occurred while deleting the group', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
