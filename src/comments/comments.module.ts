import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [CommentsService,DatabaseService],
  controllers: [CommentsController]
})
export class CommentsModule {}
