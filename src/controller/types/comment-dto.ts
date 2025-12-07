import { Expose } from 'class-transformer';
import { IsString, Length, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CommentDTO {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public author!: any;

  @Expose()
  public createdAt!: string;
}

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
  @IsOptional()
    authorId?: string;

  @Expose()
  @IsString()
    offerId!: string;
}
