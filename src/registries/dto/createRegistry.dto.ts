import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateRegistryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the registry' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The ID of the user creating the registry' })
  userId: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'The ID of the event' ,default: null})
  eventId?: number;

  //   @IsOptional()
  //   @ValidateNested({ each: true })
  //   @Type(() => CreateGiftDto)
  //   @ApiProperty({
  //     description: 'An optional list of gifts associated with the registry',
  //     type: [CreateGiftDto],
  //     required: false,
  //   })
  //   gifts?: CreateGiftDto[];
}
