import {City, Coordinates, Good, OfferType} from '../../../types/index.js';
import {IUser} from '../user/IUser.js';


export interface IOffer {
  title: string;
  description: string;
  postDate: string;
  city: City;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  goods: Good[];
  author: IUser | string;
  commentsCount: number;
  coordinates: Coordinates;
  createdAt?: Date;
  updatedAt?: Date;
}
