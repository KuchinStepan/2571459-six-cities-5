export interface OfferSource {
  title: string;
  description: string;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: string;
  rooms: number;
  guests: number;
  price: number;
  goods: string[];
  user: {
    name: string;
    email: string;
    avatar: string;
    type: string;
  };
  location: { latitude: number; longitude: number };
}
