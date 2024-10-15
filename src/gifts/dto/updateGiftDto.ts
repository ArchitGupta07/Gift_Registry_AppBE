import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGiftDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The name of the gift', required: false })
  giftName?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The price of the gift', required: false })
  price?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Gift Buy Status', required: false })
  giftStatus?: boolean;

  //   @IsOptional()
  //   @IsString()
  //   @ApiProperty({ description: 'The url for the gift' })
  //   giftUrl?: string;

  //   @IsOptional()
  //   @IsNumber()
  //   @ApiProperty({ description: 'Registry of the gift' })
  //   registryId?: number;
}
