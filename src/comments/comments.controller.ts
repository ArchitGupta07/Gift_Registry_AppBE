import { Body, Controller, Get, HttpException, HttpStatus, Query, Res, Version } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { isInstance } from 'class-validator';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService : CommentsService){}

    @Version('1')
    @Get('/')
    async getComments(@Res() res: Response, @Query('eventId') eventId?: number,
    @Query('parentCommentId') parentCommentId?: number)
    {
        try {
            const eventIdNumber = eventId ? Number(eventId) : undefined;
            const parentCommentIdNumber = parentCommentId ? Number(parentCommentId) : undefined;
            const response = await this.commentService.getComments(eventIdNumber,parentCommentIdNumber);

            return res.status(HttpStatus.OK).json(response)
        }
        catch(error) {
            if(error instanceof HttpException){
                return res.status(error.getStatus()).json(error.getResponse());
            }
            else throw new HttpException("Internal server error",HttpStatus.INTERNAL_SERVER_ERROR)

            }
    }
}
