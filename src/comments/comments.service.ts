import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {

    constructor(private readonly databaseServive : DatabaseService){}
    async getComments(eventId? : number,parentCommentId? : number)
    {
        if(!eventId && !parentCommentId){
            throw new HttpException("Illegal Request",400)
        }
        if(eventId) {
            const eventExists = await this.databaseServive.event.findUnique({
                where : {
                    id : eventId
                }
            })
            if(!eventExists)
            {
                throw new HttpException("Event not found",HttpStatus.NOT_FOUND)
            }                
            
            const comments = await this.databaseServive.comment.findMany({
                omit : {
                    createdAt : true,
                    updatedAt : true 
                 },
                where : {
                    eventId
                },
            })
            return comments
        }
        if(parentCommentId) {
            const commentExists = await this.databaseServive.comment.findUnique({
                where : {
                    id : parentCommentId
                }
            })
            if(!commentExists){
                throw new HttpException("Parent comment not found",HttpStatus.NOT_FOUND)

            }
            const comments = await this.databaseServive.comment.findMany({
                omit : {
                    createdAt : true,
                    updatedAt : true 
                 },
                where : {
                    parentId : parentCommentId
                },
            })
            return comments
        }
        throw new HttpException("Comment not found",HttpStatus.NOT_FOUND)

    }
}
