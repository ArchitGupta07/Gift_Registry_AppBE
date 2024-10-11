import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {

    constructor(private readonly databaseServive : DatabaseService){}
    async getComments(eventId?: number, parentCommentId?: number) {
        if (!eventId && !parentCommentId) {
            throw new HttpException("Illegal Request", HttpStatus.BAD_REQUEST);
        }
    
        let comments;
        
        if (eventId) {
            const eventExists = await this.databaseServive.event.findUnique({
                where: { id: eventId },
            });
            if (!eventExists) {
                throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
            }
    
            comments = await this.databaseServive.comment.findMany({
                where: { eventId },
                select: {
                    commentText: true,
                    parentId: true,
                    user: {
                        select: { id: true, username: true }
                    }
                },
            });
        } else if (parentCommentId) {
            const commentExists = await this.databaseServive.comment.findUnique({
                where: { id: parentCommentId },
            });
            if (!commentExists) {
                throw new HttpException("Parent comment not found", HttpStatus.NOT_FOUND);
            }
    
            comments = await this.databaseServive.comment.findMany({
                where: { parentId: parentCommentId },
                select: {
                    commentText: true,
                    parentId: true,
                    user: {
                        select: { id: true, username: true }
                    }
                },
            });
        }
    
        if (!comments || comments.length === 0) {
            throw new HttpException("Comments not found", HttpStatus.NOT_FOUND);
        }
    
        const response = comments.map(comment => ({
            username: comment.user.username,
            comment: comment.commentText,
            parentId: comment.parentId,
        }));
    
        return response;
    }
    
}
