import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

class UpdateGiftDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The name of the gift', required: false })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The price of the gift', required: false })
  price?: number;
}
