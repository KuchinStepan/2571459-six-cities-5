import { Expose } from 'class-transformer';


export class UserDTO {
  @Expose()
  public id!: string;


  @Expose()
  public name!: string;


  @Expose()
  public email!: string;


  @Expose()
  public avatar?: string;


  @Expose()
  public type!: 'ordinary' | 'pro';


  @Expose()
  public createdAt?: string;


  @Expose()
  public updatedAt?: string;
}


export class UserRegisterDTO {
  @Expose()
  public name!: string;


  @Expose()
  public email!: string;


  @Expose()
  public avatar?: string;


  @Expose()
  public password!: string;


  @Expose()
  public type!: 'ordinary' | 'pro';
}


export class UserLoginDTO {
  @Expose()
  public email!: string;


  @Expose()
  public password!: string;
}
