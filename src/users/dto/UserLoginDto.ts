import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UserLoginDto {

    

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Email id of the user' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'password of the user' })
    password: string;

}