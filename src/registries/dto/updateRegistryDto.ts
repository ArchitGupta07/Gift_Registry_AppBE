import {
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegistryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The name of the registry', required: false })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The user ID associated with the registry',
    required: false,
  })
  userId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The event ID associated with the registry',
    required: false,
  })
  eventId?: number;

  //   @IsOptional()
  //   @ValidateNested({ each: true }) // Validate each nested gift object
  //   @Type(() => UpdateGiftDto) // Transform and validate nested gifts
  //   @ApiProperty({
  //     description: 'An optional list of gifts associated with the registry',
  //     type: [UpdateGiftDto],
  //     required: false,
  //   })
  //   gifts?: UpdateGiftDto[];
}
