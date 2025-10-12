// import { City, Good, UserType } from ;

import {City, Good, UserType} from '../types/index.js';

export interface CityData {
  name: City;
  latitude: number;
  longitude: number;
}

export interface UserData {
  email: string;
  name: string;
  type: UserType;
}

export interface MockData {
  cities: CityData[];
  users: UserData[];
  goods: Good[];
}
