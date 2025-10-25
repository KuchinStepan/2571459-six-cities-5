import { City, OfferType, Good } from '../../../../types/index.js';

export interface CreateOfferDto {
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
  authorId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
