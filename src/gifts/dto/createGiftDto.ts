import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsSemVer,
  IsString,
} from 'class-validator';

export class CreateGiftDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the gift' })
  giftName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The url for the gift' })
  giftUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The price of the gift' })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Registry of the gift' })
  registryId: number;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'The Image of the gift'})
  Image: string
}
