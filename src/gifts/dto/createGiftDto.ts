import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsSemVer,
  IsString,
} from 'class-validator';

export class CreateGiftDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the gift' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The price of the gift' })
  price: number;
}
