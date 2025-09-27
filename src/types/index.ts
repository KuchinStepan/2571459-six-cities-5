export function isTypeOf<A extends string>(str: string, array: Readonly<Array<A>>): A | undefined {
  const foundKey = array.find((value) => value === str);

  if (!foundKey) {
    return;
  }

  return foundKey;
}

export const CityValues = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export type City = typeof CityValues[number];

export const OfferTypeValues = ['apartment', 'house', 'room', 'hotel']as const;
export type OfferType = typeof OfferTypeValues[number];

export type UserType = 'ordinary' | 'pro' ;

export const GoodValues = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge',
] as const;
export type Good = typeof GoodValues[number];

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface UserInput {
  name: string; // 1..15
  email: string;
  avatar?: string | null; //заканчивается на .jpg или .png
  password: string; // 6..12
  type: UserType;
}

export interface CommentInput {
  text: string; // 5..1024
  date?: string;
  rating: number; // 1..5
  authorEmail: string;
}

export interface OfferInput {
  title: string;
  description: string;
  postDate: string;
  city: City;
  previewImage: string;
  photos: Array<string>; // 6
  isPremium: boolean;
  isFavorite: boolean;
  rating: number; // 1..5
  type: OfferType;
  rooms: number; // 1..8
  guests: number; // 1..10
  price: number; // 100..100000
  goods: Good[];
  authorEmail: string;
  coordinates: Coordinates;
}

export interface Offer extends OfferInput {
  id: string;
  commentsCount: number;
}
