import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
  // Import your DatabaseService

@Injectable()
export class GatewayService {
  constructor(private readonly databaseService: DatabaseService) {}


  async create(createCommentDto) {

    const { userId, eventId, commentText, parentId } = createCommentDto;
    return this.databaseService.comment.create({
      data:  {
        userId,
        eventId,
        commentText,
        parentId: parentId ?? null, // Optional: set to null if undefined
      },
    });
  }

  
  async findAll(eventId: number) {
    if (eventId) {
      const comments =  await this.databaseService.comment.findMany({
        where: {
          eventId,
        //   parentId: null, 
        },
        select: {
            id: true,
            userId: true,
            eventId: true,
            commentText:true,
            parentId:true,
            user: {
                select: {
                  username: true,  // Fetch the username from the related User table
                },
              },

        },
        orderBy: { createdAt: 'asc' },  
      });

    //   console.log("comments.................")
    //   console.log(comments)

      return comments.map(comment => ({
        id:comment.id,
        userId: comment.userId,
        eventId: comment.eventId,
        commentText: comment.commentText,
        parentId: comment.parentId,
        username: comment.user.username, // Move username outside of user object
      }));
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