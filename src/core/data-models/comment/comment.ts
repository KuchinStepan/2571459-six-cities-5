import {getModelForClass, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/user.js';
import {OfferEntity} from '../offer/offer.js';
import {Document} from 'mongoose';

export class CommentEntity extends Document {
  @prop({ required: true, minlength: 5, maxlength: 1024 })
  public text!: string;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true, ref: () => UserEntity })
  public author!: Ref<UserEntity>;

  @prop({ required: true, ref: () => OfferEntity })
  public offer!: Ref<OfferEntity>;

  @prop({ required: true, default: Date.now })
  public date!: Date;
}

export const CommentModel = getModelForClass(CommentEntity, {
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
});
