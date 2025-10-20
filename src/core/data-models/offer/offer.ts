import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import {City, CityValues, Coordinates, Good, GoodValues, OfferType, OfferTypeValues} from '../../../types/index.js';
import {UserEntity} from '../user/user.js';
import {Document} from 'mongoose';

export class OfferEntity extends Document {
  @prop({ required: true, minlength: 10, maxlength: 100 })
  public title!: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description!: string;

  @prop({ required: true })
  public postDate!: string;

  @prop({ required: true, enum: CityValues })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true, type: () => [String], validate: (v: string[]) => v.length === 6 })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true, enum: OfferTypeValues })
  public type!: OfferType;

  @prop({ required: true, min: 1, max: 8 })
  public rooms!: number;

  @prop({ required: true, min: 1, max: 10 })
  public guests!: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price!: number;

  @prop({ required: true, type: () => [String], enum: GoodValues })
  public goods!: Good[];

  @prop({ required: true, ref: () => UserEntity })
  public author!: Ref<UserEntity>;

  @prop({ required: true, default: 0 })
  public commentsCount!: number;

  @prop({ required: true, type: () => ({ latitude: Number, longitude: Number }) })
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity, {
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
});
