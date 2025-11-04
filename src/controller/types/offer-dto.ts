import { Expose, Type } from 'class-transformer';

export type City = 'Paris'|'Cologne'|'Brussels'|'Amsterdam'|'Hamburg'|'Dusseldorf';
export type OfferType = 'apartment'|'house'|'room'|'hotel';
export type Good = 'Breakfast'|'Air conditioning'|'Laptop friendly workspace'|'Baby seat'|'Washer'|'Towels'|'Fridge';

export class CoordinatesDTO {
  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}

export class OfferDTO {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public city!: City;

  @Expose()
  public previewImage!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: Good[];

  @Expose()
  @Type(() => Object)
  public author!: any;

  @Expose()
  public commentsCount?: number;

  @Expose()
  @Type(() => CoordinatesDTO)
  public coordinates!: CoordinatesDTO;

  @Expose()
  public createdAt?: string;

  @Expose()
  public updatedAt?: string;
}

export class OfferCreateDTO extends OfferDTO { }
