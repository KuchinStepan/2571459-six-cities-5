import {OfferInput} from "../types";

export function parseBool(value: string): boolean {
  return ['true', '1', 'yes'].includes(value.toLowerCase());
}

export function parseNumber(value: string): number | null {
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

export function validateOffer(o: OfferInput): string[] {
  const errors: string[] = [];
  if (o.title.length < 10 || o.title.length > 100) {
    errors.push('title length 10..100');
  }
  if (o.description.length < 20 || o.description.length > 1024) {
    errors.push('description length 20..1024');
  }
  if (isNaN(Date.parse(o.postDate))) {
    errors.push('postDate invalid');
  }
  if (!['Paris','Cologne','Brussels','Amsterdam','Hamburg','Dusseldorf'].includes(o.city)) {
    errors.push('city invalid');
  }
  if (o.photos.length !== 6) {
    errors.push('photos must have 6 urls');
  }
  if (o.rating < 1 || o.rating > 5) {
    errors.push('rating 1..5');
  }
  if (o.rooms < 1 || o.rooms > 8) {
    errors.push('rooms 1..8');
  }
  if (o.guests < 1 || o.guests > 10) {
    errors.push('guests 1..10');
  }
  if (o.price < 100 || o.price > 100000) {
    errors.push('price 100..100000');
  }
  if (o.goods.length < 1) {
    errors.push('goods required');
  }
  return errors;
}
