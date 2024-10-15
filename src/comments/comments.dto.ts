import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class AddCommentDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId : number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    commentText : string

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    parentId? : number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    eventId : number
}