import {OfferSource} from './OfferSource.js';
import {getRandomBoolean, getRandomFloat, getRandomInt, getRandomItem} from '../helpers/random.js';

export class OfferGenerator {
  constructor(private baseOffers: OfferSource[]) {}

  public generate(): string {
    const offer = getRandomItem(this.baseOffers);

    const title = offer.title;
    const description = offer.description;
    const date = new Date().toISOString();
    const city = offer.city;
    const previewImage = offer.previewImage;
    const images = offer.images.join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = getRandomFloat(1, 5, 1);
    const type = offer.type;
    const rooms = getRandomInt(1, 8);
    const guests = getRandomInt(1, 10);
    const price = getRandomInt(100, 100000);
    const goods = offer.goods.join(';');
    const userName = offer.user.name;
    const email = offer.user.email;
    const avatar = offer.user.avatar;
    const userType = offer.user.type;
    const latitude = offer.location.latitude;
    const longitude = offer.location.longitude;

    // Формат TSV: поля разделены табуляцией
    return [
      title, description, date, city, previewImage, images, isPremium,
      isFavorite, rating, type, rooms, guests, price, goods, userName,
      email, avatar, userType, latitude, longitude
    ].join('\t');
  }
}
