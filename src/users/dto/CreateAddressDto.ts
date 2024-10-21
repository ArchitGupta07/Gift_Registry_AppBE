import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty({ description: 'ID of the user', example: 1 })
    @IsInt()
    userId: number;

    @ApiProperty({ description: 'Primary address line', example: '123 Main St' })
    @IsString()
    @IsNotEmpty()
    addressLine1: string;

    @ApiProperty({ description: 'Secondary address line', example: 'Apt 4B', required: false })
    @IsString()
    @IsOptional()
    addressLine2?: string;

    @ApiProperty({ description: 'Landmark near the address', example: 'Near Central Park' })
    @IsString()
    @IsNotEmpty()
    landmark: string;

    @ApiProperty({ description: 'Postal code', example: 123456 })
    @IsInt()
    @IsNotEmpty()
    pincode: number;

    @ApiProperty({ description: 'City name', example: 'New York' })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ description: 'Country name', example: 'USA' })
    @IsString()
    @IsNotEmpty()
    country: string;
}