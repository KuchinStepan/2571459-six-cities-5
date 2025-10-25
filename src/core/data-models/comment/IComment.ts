import {UserEntity} from '../user/user.js';
import {OfferEntity} from '../offer/offer.js';

export interface IComment {
  text: string;
  rating: number;
  author: UserEntity;
  offer: OfferEntity;
  date: Date;
}
