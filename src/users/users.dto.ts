import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
