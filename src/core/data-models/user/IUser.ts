import {UserType} from '../../../types/index.js';


export interface IUser {
  name: string;
  email: string;
  avatar?: string | null;
  password: string;
  type: UserType;
  createdAt?: Date;
  updatedAt?: Date;
}
