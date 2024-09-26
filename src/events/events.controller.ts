import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {EventsService} from './events.service';
import { CreateEventDto } from './events.dto';
import { ApiTags } from '@nestjs/swagger';

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

}
