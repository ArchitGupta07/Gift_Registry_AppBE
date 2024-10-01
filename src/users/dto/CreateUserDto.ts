import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'name for the user' })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Email id of the user' })
    email: string;

    // @IsNotEmpty()
    // @IsString()
    // @ApiProperty({ description: 'Email id of the user' })
    // password: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'profile Pic of the user' })
    profilePic: string;
}