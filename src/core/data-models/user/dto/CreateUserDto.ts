import { Expose } from 'class-transformer';
import {
  IsString, IsEmail, Length, IsOptional, IsIn
} from 'class-validator';

export class CreateUserDTO {
  @Expose()
  @IsString()
  @Length(1, 50)
    name!: string;

  @Expose()
  @IsEmail()
    email!: string;

  @Expose()
  @IsString()
  @Length(6, 12)
    password!: string;

  @Expose()
  @IsString()
  @IsOptional()
    avatar?: string;

  @Expose()
  @IsIn(['ordinary', 'pro'])
    type!: 'ordinary' | 'pro';
}
