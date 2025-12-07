import { Expose, Type } from 'class-transformer';
import {
  IsString, IsBoolean, IsArray, IsNumber,
  Min, Max, Length, ArrayMaxSize, ValidateNested, IsIn
} from 'class-validator';
import {City, OfferType, Good, GoodValues, OfferTypeValues, CityValues} from '../../../../types/index.js';

export class CoordinatesDTO {
  @Expose()
  @IsNumber()
    latitude!: number;

  @Expose()
  @IsNumber()
    longitude!: number;
}

export class CreateOfferDTO {
  @Expose()
  @IsString()
  @Length(10, 100)
    title!: string;

  @Expose()
  @IsString()
  @Length(20, 1024)
    description!: string;

  @Expose()
  @IsString()
    postDate!: string;

  @Expose()
  @IsString()
  @IsIn(Object.values(CityValues))
    city!: City;

  @Expose()
  @IsString()
    previewImage!: string;

  @Expose()
  @IsArray()
  @ArrayMaxSize(6)
    photos!: string[];

  @Expose()
  @IsBoolean()
    isPremium!: boolean;

  @Expose()
  @IsBoolean()
    isFavorite!: boolean;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
    rating!: number;

  @Expose()
  @IsString()
  @IsIn(Object.values(OfferTypeValues))
    type!: OfferType;

  @Expose()
  @IsNumber()
  @Min(1)
    rooms!: number;

  @Expose()
  @IsNumber()
  @Min(1)
    guests!: number;

  @Expose()
  @IsNumber()
  @Min(100)
  @Max(100000)
    price!: number;

  @Expose()
  @IsArray()
  @IsIn(Object.values(GoodValues), { each: true })
    goods!: Good[];

  @Expose()
  @IsString()
    authorId!: string;

  @Expose()
  @ValidateNested()
  @Type(() => CoordinatesDTO)
    coordinates!: CoordinatesDTO;
}
