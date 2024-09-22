import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './events.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createEvent(createEvent: CreateEventDto) {
    try {
      const {
        userId,
        eventName,
        description,
        organizers,
        members,
      }: CreateEventDto = createEvent;
      const event = await this.databaseService.event.create({
        data: {
          userId,
          eventName,
          description,
        },
      });
      const eventId = event.id;
    
      let userEvents = [
        ...organizers.map((userId) => ({
          userId,
          eventId,
          role: 'organizer',
        })),
        ...members.map((userId) => ({
          userId,
          eventId,
          role: 'member',
        })),
      ];
      await this.databaseService.userEvents.createMany({
        data: userEvents,
      });
      return event;
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  }
  async getEvents(userId: number) {
    try {
      const userEvents = await this.databaseService.userEvents.findMany({
        where: {
          userId,
        },
        select: {
          eventId: true,
          role: true,
        },
      });

      const eventIds: number[] = userEvents.map(
        (event: { eventId: any }) => event.eventId,
      );

      const events = await this.databaseService.event.findMany({
        where: {
          id: {
            in: eventIds,
          },
        },
      });

      const eventsWithRoles = events.map((event) => {
        const userEvent = userEvents.find((ue) => ue.eventId === event.id);
        return {
          ...event,
          role: userEvent?.role,
        };
      });

      return eventsWithRoles;
    } catch (error) {
      console.error('Error fetching shared events:', error);
      return [];
    }
  }
}
