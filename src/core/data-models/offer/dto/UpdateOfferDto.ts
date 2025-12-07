import { Expose, Type } from 'class-transformer';
import {
  IsString, IsBoolean, IsArray, IsNumber, IsOptional,
  Min, Max, Length, ArrayMaxSize, ValidateNested, IsIn
} from 'class-validator';
import {City, OfferType, Good, GoodValues, OfferTypeValues, CityValues} from '../../../../types/index.js';
import {CoordinatesDTO} from '../../../../controller/types/offer-dto.js';

export class UpdateOfferDTO {
  @Expose()
  @IsString()
  @Length(10, 100)
  @IsOptional()
    title?: string;

  @Expose()
  @IsString()
  @Length(20, 1024)
  @IsOptional()
    description?: string;

  @Expose()
  @IsString()
  @IsIn(Object.values(CityValues))
  @IsOptional()
    city?: City;

  @Expose()
  @IsString()
  @IsOptional()
    previewImage?: string;

  @Expose()
  @IsArray()
  @ArrayMaxSize(6)
  @IsOptional()
    photos?: string[];

  @Expose()
  @IsBoolean()
  @IsOptional()
    isPremium?: boolean;

  @Expose()
  @IsBoolean()
  @IsOptional()
    isFavorite?: boolean;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
    rating?: number;

  @Expose()
  @IsString()
  @IsIn(Object.values(OfferTypeValues))
  @IsOptional()
    type?: OfferType;

  @Expose()
  @IsNumber()
  @Min(1)
  @IsOptional()
    rooms?: number;

  @Expose()
  @IsNumber()
  @Min(1)
  @IsOptional()
    guests?: number;

  @Expose()
  @IsNumber()
  @Min(100)
  @Max(100000)
  @IsOptional()
    price?: number;

  @Expose()
  @IsArray()
  @IsIn(Object.values(GoodValues), { each: true })
  @IsOptional()
    goods?: Good[];

  @Expose()
  @ValidateNested()
  @Type(() => CoordinatesDTO)
  @IsOptional()
    coordinates?: CoordinatesDTO;
}
