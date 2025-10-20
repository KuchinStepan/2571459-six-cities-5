import {IEntityRepository} from '../../IEntityRepository.js';
import {IOffer} from './IOffer.js';


export interface IOfferRepository extends IEntityRepository<IOffer> {
  findByCity(city: string): Promise<IOffer[]>;
}
