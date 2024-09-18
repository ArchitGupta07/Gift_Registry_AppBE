import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './events.dto';

@Injectable()
export class EventsService {
    async createEvent( createEvent: CreateEventDto) {
        try {
            const { userId,eventName, description, organizers, members }: CreateEventDto = createEvent;
            const event = await prisma.event.create({
                data: {
                    userId,
                    eventName,
                    description,
                }
            });
            const eventId = event.id;
            // now add the mapping in the userEvent table
            let userEvents = [
                ...organizers.map(userId => ({
                    userId,
                    eventId,
                    role : 'organizer'
                })),
                ...members.map(userId => ({
                    userId,
                    eventId,
                    role : 'member'
                }))
            ];
            await prisma.userEvents.createMany({
                data : userEvents
            }) 
            return event;
        } catch (error) {
            console.error('Error creating event:', error);
            return null;
        }
    }
    async getEvents(userId : Number) {
        try {
            const userEvents = await prisma.userEvents.findMany({
              where: {
                userId: userId,
              },
              select: {
                eventId: true,
                role : true
              },
            });
      
            const eventIds: number[] = userEvents.map(
              (event: { eventId: any }) => event.eventId
            );
      
            const events = await prisma.event.findMany({
              where: {
                id: {
                  in: eventIds,
                },
              },
            });
      
                  // for every event i also want to send the type of event for that specific event
                  const eventsWithRoles = events.map(event => {
                      const userEvent = userEvents.find(ue => ue.eventId === event.id);
                      return {
                        ...event,
                      role: userEvent?.role
                      };
                    });
                
                    return eventsWithRoles;
              } catch (error) {
                  console.error('Error fetching shared events:', error);
                  return [];
              }
    }
}
