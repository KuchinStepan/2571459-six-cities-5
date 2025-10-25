import { City, OfferType, Good } from '../../../../types/index.js';

export interface UpdateOfferDto {
  title?: string;
  description?: string;
  city?: City;
  previewImage?: string;
  photos?: string[];
  isPremium?: boolean;
  isFavorite?: boolean;
  rating?: number;
  type?: OfferType;
  rooms?: number;
  guests?: number;
  price?: number;
  goods?: Good[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
