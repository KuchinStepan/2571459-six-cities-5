import { Expose } from 'class-transformer';
import { IsString, Length, IsNumber, Min, Max } from 'class-validator';

export class CreateCommentDTO {
  @Expose()
  @IsString()
  @Length(5, 1024)
    text!: string;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
    rating!: number;

  @Expose()
  @IsString()
    offerId!: string;
}
