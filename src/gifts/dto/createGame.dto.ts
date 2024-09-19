import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsSemVer,
  IsString,
} from 'class-validator';

export class CreateGiftDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
