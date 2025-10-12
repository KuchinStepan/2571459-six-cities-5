import {getRandomBoolean, getRandomFloat, getRandomInt, getRandomItem} from '../helpers/random.js';
import {OfferInput} from '../types/index.js';
import {MockData} from './test-data-types.js';

export class OfferGenerator {
  constructor(private mockData: MockData) {}

  public generate(): OfferInput & {
    author: { name: string; avatar: string; password: string; type: string }
    } {
    const city = getRandomItem(this.mockData.cities);
    const user = getRandomItem(this.mockData.users);
    const goods = Array.from(
      { length: getRandomInt(1, this.mockData.goods.length) },
      () => getRandomItem(this.mockData.goods)
    );

    return {
      title: `Cozy stay in ${city.name}`,
      description: `Enjoy a wonderful trip in ${city.name}. This ${getRandomItem(['apartment', 'house', 'room', 'hotel'])} is perfect for your stay.`,
      postDate: new Date().toISOString(),
      city: city.name,
      previewImage: `https://example.com/images/${city.name.toLowerCase()}-preview.jpg`,
      photos: Array.from({ length: 6 }, (_, i) => `https://example.com/images/${city.name.toLowerCase()}-${i + 1}.jpg`),
      isPremium: getRandomBoolean(),
      isFavorite: getRandomBoolean(),
      rating: getRandomFloat(1, 5, 1),
      type: getRandomItem(['apartment', 'house', 'room', 'hotel']),
      rooms: getRandomInt(1, 8),
      guests: getRandomInt(1, 10),
      price: getRandomInt(100, 100000),
      goods,
      authorEmail: user.email,
      author: {
        name: user.name,
        avatar: `https://example.com/avatars/${user.name.toLowerCase()}.png`,
        password: '123456',
        type: user.type
      },
      coordinates: {
        latitude: city.latitude + Math.random() * 0.01,
        longitude: city.longitude + Math.random() * 0.01
      }
    };
  }
}
