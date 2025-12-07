import { Expose } from 'class-transformer';

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

export class CommentCreateDTO {
  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public offerId!: string;

  @Expose()
  public userId?: number;
}

