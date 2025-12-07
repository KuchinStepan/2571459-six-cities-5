import { Expose } from 'class-transformer';
import { IsString, Length, IsOptional, IsIn } from 'class-validator';

export class UpdateUserDTO {
  @Expose()
  @IsString()
  @Length(1, 50)
  @IsOptional()
    name?: string;

  @Expose()
  @IsString()
  @IsOptional()
    avatar?: string;

  @Expose()
  @IsString()
  @Length(6, 12)
  @IsOptional()
    password?: string;

  @Expose()
  @IsIn(['ordinary', 'pro'])
  @IsOptional()
    type?: 'ordinary' | 'pro';
}
