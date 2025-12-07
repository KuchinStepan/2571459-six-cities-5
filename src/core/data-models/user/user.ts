import { getModelForClass, prop } from '@typegoose/typegoose';
import {Document} from 'mongoose';

export class UserEntity extends Document {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop()
  public avatar?: string;

  @prop({ required: true })
  public passwordHash!: string;

  @prop({ required: true, enum: ['ordinary', 'pro'] })
  public type!: 'ordinary' | 'pro';
}

export const UserModel = getModelForClass(UserEntity, {
  schemaOptions: {
    timestamps: true,
    collection: 'users'
  },
});
