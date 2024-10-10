import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
  // Import your DatabaseService

@Injectable()
export class GatewayService {
  constructor(private readonly databaseService: DatabaseService) {}


  async create(createCommentDto) {

    const { sender, eventId, commentText, parentId } = createCommentDto;
    return this.databaseService.comment.create({
      data:  {
        userId:sender,
        eventId,
        commentText,
        parentId: parentId ?? null, // Optional: set to null if undefined
      },
    });
  }

  
  async findAll(eventId: number) {
    if (eventId) {
      return this.databaseService.comment.findMany({
        where: {
          eventId,
          parentId: null, 
        },
        include: {
          replies: true,  
        },
        orderBy: { createdAt: 'asc' },  
      });
    }

    return this.databaseService.comment.findMany();
  }

  async findOne(commentId: number) {
    return this.databaseService.comment.findUnique({
      where: { id: commentId },
      include: { replies: true },
    });
  }
}