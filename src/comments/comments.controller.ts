import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Res, Version } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { isInstance } from 'class-validator';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AddCommentDto } from './comments.dto';


@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService : CommentsService){}

    @Version('1')
    @Get('/')
    async getComments(@Res() res: Response, @Query('eventId') eventId?: number,
    @Query('parentCommentId') parentCommentId?: number)
    {
        console.log("hello from the comment controller")
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

    @Version('1')
    @ApiBody({
        description: 'The data required to create a new comment',
        type: AddCommentDto,
      })
    @Post('/')
    async createComments(@Body() addCommentDto : AddCommentDto){
        console.log("hello from the comment controller")
        const response = await this.commentService.addComment(addCommentDto);
        return response
    }

}
